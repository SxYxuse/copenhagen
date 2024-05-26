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

<p class={cn('leading-7 [&:not(:first-child)]:mt-2', className)} {...restProps}>
	{@render children()}
</p>
