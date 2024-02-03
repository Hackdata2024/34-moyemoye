import { lucia } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const createLuciaClient: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const authorization: Handle = async ({ event, resolve }) => {
	const session = event.locals.session;
	const user = event.locals.user;

	if (!session && (event.url.pathname === '/profile')) {
		throw redirect(303, '/');
	}

	// GET requests
	if (event.request.method === 'GET') {
		// if user not signed in and trying to access dashboard or admin page
		// if user is admin and tries to go to dashboard, redirect to admin page
		if (event.url.pathname.startsWith('/profile') && user === null) {
			throw redirect(303, '/');
		}
	}

	return resolve(event);
};


export const handle = sequence(createLuciaClient, authorization);
