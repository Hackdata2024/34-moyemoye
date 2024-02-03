import { google, lucia } from '$lib/auth';
import { OAuth2RequestError } from 'arctic';
import { parseCookies } from 'oslo/cookie';
import { generateId } from 'lucia';

import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/prisma';

export async function GET(event: RequestEvent): Promise<Response> {
	const cookies = parseCookies(event.request.headers.get('Cookie') ?? '');
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = cookies.get('google_oauth_state') ?? null;
	const codeVerifier = cookies.get('code_verifier') ?? null;
	// console.log(codeVerifier);
	// const codeVerifier = generateCodeVerifier();
	if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);

		const googleUserResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		// console.log('googleUserResponse', await googleUserResponse.json())
		const googleUser: {
			id: string;
			name: string;
			picture: string;
		} = await googleUserResponse.json();
		const existingUser = await db.user.findUnique({
			where: {
				googleSub: googleUser.id
			}
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(15);
			await db.user.upsert({
				where: { id: userId },
				update: { googleSub: googleUser.id },
				create: { id: userId, googleSub: googleUser.id, username: googleUser.name }
			});
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log('error', e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface googleUser {
	id: string;
	login: string;
}
