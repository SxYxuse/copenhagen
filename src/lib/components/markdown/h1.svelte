<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string | undefined | null;
		restProps?: SvelteRestProps;
		children: Snippet;
	};

	let { class: className = undefined, children, ...restProps }: Props = $props();
</script>

<h1 class={cn('mt-2 scroll-m-20 text-4xl font-bold', className)} {...restProps}>
	{@render children()}
</h1>
