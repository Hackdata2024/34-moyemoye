import {
	getUserProfile,
	sendFriendRequest
} from '$db/Friends.db';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		profile: await getUserProfile(locals.user!.id)
	};
};

export const actions: Actions = {
	async sendRequest({ request, locals }) {
		const form = await request.formData();
		const inviteCode = form.get('inviteCode') as string;

		try {
			return {
				result: await sendFriendRequest(locals.user!.id, inviteCode),
				profile: await getUserProfile(locals.user!.id)
			};
		} catch (e) {
			return fail(400, {
				error: `${e}`,
				profile: await getUserProfile(locals.user!.id)
			});
		}
	},
};
