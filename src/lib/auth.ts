import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import {
	PUBLIC_GOOGLE_CLIENT_SECRET,
	PUBLIC_GOOGLE_CLIENT_ID,
	PUBLIC_REDIRECT_URI
} from '$env/static/public';

import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { db } from '$lib/prisma';
import { Google } from 'arctic';

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			googleID: attributes.googleSub,
			username: attributes.username,
			picture: attributes.picture,
			inviteCode: attributes.inviteCode,
			email: attributes.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	googleSub: number;
	username: string;
	picture: string;
	inviteCode: string;
	email: string;
}


export const google = new Google(
	PUBLIC_GOOGLE_CLIENT_ID,
	PUBLIC_GOOGLE_CLIENT_SECRET,
	PUBLIC_REDIRECT_URI
);
