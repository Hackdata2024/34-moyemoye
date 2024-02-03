import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	if (url.pathname === '/profile') {
		redirect(308, '/profile/friends');
	}
};
