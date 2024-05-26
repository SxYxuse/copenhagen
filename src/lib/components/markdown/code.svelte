<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string | undefined | null;
		children: Snippet;
	};

	let { class: className = undefined, children }: Props = $props();
</script>

<code
	class={cn(
		'relative inline-flex h-[27px] items-center justify-center bg-muted px-[8px] font-mono text-xs font-medium tracking-tighter text-foreground/60 sm:text-sm',
		className,
		'custom'
	)}
>
	{@render children()}
</code>
