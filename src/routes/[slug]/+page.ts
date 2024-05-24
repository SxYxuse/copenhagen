import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const page = await import(`../../content/${params.slug}.md`);

	return {
		content: page.default,
		metadata: page.metadata
	};
};
