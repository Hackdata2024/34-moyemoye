import { google } from '$lib/auth';
import { generateCodeVerifier, generateState } from 'arctic';
import { redirect } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ['openid', 'profile', 'email']
	});

	event.cookies.set('google_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	event.cookies.set('code_verifier', codeVerifier, {
		httpOnly: true,
		secure: import.meta.env.PROD,
		maxAge: 60 * 10,
		path: '/',
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}
