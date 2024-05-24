import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Page } from '$lib/type';

const getPages = async () => {
	const pages: Page[] = [];

	const paths = import.meta.glob(`/src/content/**/*.md`, { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Page, 'slug'>;
			const page: Page = { ...metadata, slug };

			if (page.published) {
				pages.push(page);
			}
		}
	}

	return pages;
};

export const GET: RequestHandler = async () => {
	const pages = await getPages();

	return json(pages);
};
