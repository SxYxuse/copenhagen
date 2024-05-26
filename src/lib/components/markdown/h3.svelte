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

<h3 class={cn('mt-6 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...restProps}>
	{@render children()}
</h3>
