<script lang="ts">
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { Icons } from './icons';

	type Props = {
		copyCode: () => void;
		copied?: boolean;
		class: string | undefined | null;
		restProps?: SvelteRestProps;
	};

	let { copyCode, copied = false, class: className = undefined, ...restProps }: Props = $props();

	$effect(() => {
		if (copied) {
			toast.success('Copied to clipboard', { duration: 2500 });
		}
	});
</script>

<button
	class={cn(
		'relative z-20 inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
		className
	)}
	onclick={copyCode}
	aria-label="Copy"
	{...restProps}
	data-copy-code
>
	{#if copied}
		<Icons.Check class="h-5 w-5" />
	{:else}
		<Icons.Copy class="h-5 w-5" />
	{/if}
</button>
