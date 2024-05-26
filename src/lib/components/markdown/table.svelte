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

<div class="my-6 w-full overflow-y-auto">
	<table class={cn('w-full', className)} {...restProps}>
		{@render children()}
	</table>
</div>
