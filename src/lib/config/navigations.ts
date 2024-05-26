export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

export type Navigation = {
	main: NavItem[];
	sidebar: SidebarNavItem[];
};

export const navigation: Navigation = {
	main: [
		// {
		// 	title: 'Docs',
		// 	href: '/'
		// }
	],
	sidebar: [
		{
			title: 'Overview',
			items: [
				{
					title: 'Introduction',
					href: '/',
					items: []
				}
			]
		},
		{
			title: 'Guide',
			items: [
				{
					title: 'Server-side tokens',
					href: '/guide/server-side-tokens',
					items: []
				},
				{
					title: 'Sessions',
					href: '/guide/sessions',
					items: []
				},
				{
					title: 'Password authentication',
					href: '/guide/password-authentication',
					items: []
				},
				{
					title: 'Email verification',
					href: '/guide/email-verification',
					items: []
				},
				{
					title: 'Password reset',
					href: '/guide/password-reset',
					items: []
				},
				{
					title: 'Generating random values',
					href: '/guide/random-values',
					items: []
				},
				{
					title: 'OAuth',
					href: '/guide/oauth',
					items: []
				},
				{
					title: 'Multi-factor authentication (MFA)',
					href: '/guide/mfa',
					items: []
				},
				{
					title: 'Passkeys',
					href: '/guide/passkeys',
					items: []
				},
				{
					title: 'Cross-site request forgery (CSRF)',
					href: '/guide/csrf',
					items: []
				},
				{
					title: 'Open redirect',
					href: '/guide/open-redirect',
					items: []
				}
			]
		}
	]
};
