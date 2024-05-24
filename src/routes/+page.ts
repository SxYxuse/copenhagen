import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const page = await import(`./../content/${url.pathname === '/' ? 'index' : 'index'}.md`);

	return {
		content: page.default,
		metadata: page.metadata
	};
};
