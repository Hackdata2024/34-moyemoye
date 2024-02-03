import type { Actions, PageServerLoad } from './$types';
import { completeTask, getCompletedTasks, getFriendPoints, getPoints } from '$db/Friends.db';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return {
			user: null
		};
	}
	console.log(await getFriendPoints(event.locals.user!.id));
	return {
		user: event.locals.user,
		completedTasks: await getCompletedTasks(event.locals.user.id)
	};
};

export const actions: Actions = {
	completeTask: async ({ request, locals }) => {
		const form = await request.formData();
		await completeTask(
			locals.user!.id,
			form.get('taskTitle') as string,
			parseInt(form.get('points') as unknown as string)
		);
		// console.log(await getPoints())
		return {
			user: locals.user,
			completedTasks: await getCompletedTasks(locals.user!.id)
		};
	}
};
