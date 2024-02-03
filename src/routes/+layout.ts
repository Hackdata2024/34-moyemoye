import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, data }) => {
	return {
		user: data?.user ?? null,
		pathname:
			decodeURIComponent(url.pathname)
				.split('/')
				.filter((key) => key !== '')[0] || ''
	};
};
