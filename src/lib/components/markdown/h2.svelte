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

<h2
	class={cn('mt-6 -scroll-m-36 text-[27px] font-semibold tracking-[-0.01em] first:mt-0', className)}
	{...restProps}
>
	{@render children()}
</h2>
