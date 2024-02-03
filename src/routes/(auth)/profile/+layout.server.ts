import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getUserPoints } from '$db/Friends.db';

export const load: LayoutServerLoad = async ({ url, locals }) => {
	if (url.pathname === '/profile') {
		redirect(308, '/profile/friends');
	}

	return {
		points: await getUserPoints(locals.user!.id)
	};
};
