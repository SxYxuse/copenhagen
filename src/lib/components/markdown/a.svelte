<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		class?: string | undefined | null;
		restProps?: SvelteRestProps;
		children: Snippet;
	};

	let { href, class: className = undefined, children, ...restProps }: Props = $props();

	let internal = $derived(href.startsWith('/') || href.startsWith('#'));
	let rel = $derived(!internal ? 'noopener noreferrer' : undefined);
	let target = $derived(!internal ? '_blank' : undefined);
</script>

<a
	{href}
	{target}
	{rel}
	class={cn('link text-blue-600 dark:text-blue-500', className)}
	{...restProps}
>
	{@render children()}
</a>
