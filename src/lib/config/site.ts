import { dev } from '$app/environment';

export const siteConfig = {
	name: 'The Copenhagen Book',
	url: dev ? 'http://localhost:5173' : 'https://copenhagen.sxyxuse.dev',
	description: 'Provide guide lines for web auth',
	imageUrl: '',
	keywords: ['copenhagen', 'authentication', 'security', 'docs'],
	author: 'SxYxuse',
	themeColor: '#110F15'
};

export type SiteConfig = typeof siteConfig;
