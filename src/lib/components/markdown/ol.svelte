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

<ol class={cn('my-6 ml-6 list-decimal', className)} {...restProps}>
	{@render children()}
</ol>
