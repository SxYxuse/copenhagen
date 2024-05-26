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

<h6 class={cn('mt-4 scroll-m-20 text-base font-semibold tracking-tight', className)} {...restProps}>
	{@render children()}
</h6>
