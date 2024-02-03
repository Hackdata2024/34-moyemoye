import {
	getCompletedTasks,
} from '$db/Friends.db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		completedTasks: await getCompletedTasks(locals.user!.id)
	};
};
