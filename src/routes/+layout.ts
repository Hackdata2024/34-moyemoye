import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	return {
		pathname:
			decodeURIComponent(url.pathname)
				.split('/')
				.filter((key) => key !== '')[0] || ''
	};
};
