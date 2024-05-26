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
					href: '/content/index',
					items: []
				}
			]
		},
		{
			title: 'content',
			items: [
				{
					title: 'Server-side tokens',
					href: '/content/server-side-tokens',
					items: []
				},
				{
					title: 'Sessions',
					href: '/content/sessions',
					items: []
				},
				{
					title: 'Password authentication',
					href: '/content/password-authentication',
					items: []
				},
				{
					title: 'Email verification',
					href: '/content/email-verification',
					items: []
				},
				{
					title: 'Password reset',
					href: '/content/password-reset',
					items: []
				},
				{
					title: 'Generating random values',
					href: '/content/random-values',
					items: []
				},
				{
					title: 'OAuth',
					href: '/content/oauth',
					items: []
				},
				{
					title: 'Multi-factor authentication (MFA)',
					href: '/content/mfa',
					items: []
				},
				{
					title: 'Passkeys',
					href: '/content/passkeys',
					items: []
				},
				{
					title: 'Cross-site request forgery (CSRF)',
					href: '/content/csrf',
					items: []
				},
				{
					title: 'Open redirect',
					href: '/content/open-redirect',
					items: []
				}
			]
		}
	]
};
