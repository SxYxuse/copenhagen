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

<th
	class={cn(
		'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
		className
	)}
	{...restProps}
>
	{@render children()}
</th>
