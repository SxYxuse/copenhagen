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

<blockquote class={cn('mt-6 border-l-2 pl-6 italic', className)} {...restProps}>
	{@render children()}
</blockquote>
