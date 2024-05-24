import type { Page } from '$lib/type';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('api/pages');
	const pages: Page[] = await res.json();

	return { pages };
};
