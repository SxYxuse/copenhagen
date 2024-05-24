import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const page = await import(`./../content/index.md`);

	return {
		content: page.default,
		metadata: page.metadata
	};
};
