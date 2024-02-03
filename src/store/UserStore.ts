import type { User } from 'lucia';
import { writable } from 'svelte/store';

export let UserStore = writable<
	| (User & {
			inviteCode: string;
	  })
	| null
>(null);
