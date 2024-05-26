<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		open: boolean;
		class?: string | undefined | null;
		restProps?: SvelteRestProps;
		children: Snippet;
	};

	let {
		href,
		open = $bindable(),
		class: className = undefined,
		restProps,
		children
	}: Props = $props();
</script>

<a
	{href}
	onclick={() => (open = false)}
	class={cn($page.url.pathname === href ? 'text-foreground' : 'text-foreground/60', className)}
	{...restProps}
>
	{@render children()}
</a>
