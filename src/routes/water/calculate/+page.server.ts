import { addWaterFootprint } from '$db/Friends.db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	result: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401)
		}
		const form = await request.formData();
		const answers = form.get('answers') as string;
		const volume = form.get('volume') as string;

		await addWaterFootprint(locals.user?.id!, parseFloat(answers), volume);

		return redirect(307, '/profile/water');
	}
};
