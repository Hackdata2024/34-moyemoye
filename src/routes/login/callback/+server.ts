import { google, lucia } from '$lib/auth';
import { OAuth2RequestError, generateCodeVerifier } from 'arctic';
import { generateId } from 'lucia';

import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/prisma';

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get('code');
  const state = event.url.searchParams.get('state');
  const storedState = event.cookies.get('google_oauth_state') ?? null;
  const codeVerifier = generateCodeVerifier();
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch('https://api.google.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const googleUser: googleUser = await googleUserResponse.json();
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
      // await db.table('user').insert({
      // 	id: userId,
      // 	google_id: googleUser.id,
      // 	username: googleUser.login
      // });
      await db.user.upsert({
        where: { id: userId },
        update: { googleSub: googleUser.id },
        create: { id: userId, googleSub: googleUser.id, username: googleUser.login }
      })
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
