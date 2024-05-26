<script lang="ts">
	import { cn, createCopyCodeButton } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { CopyCodeButton } from '..';

	type Props = {
		class?: string | undefined | null;
		restProps?: SvelteRestProps;
		children: Snippet;
	};

	let { class: className = undefined, children, ...restProps }: Props = $props();

	const { copyCode, copied, setCodeString } = createCopyCodeButton();
</script>

<pre
	class={cn(
		'relative mb-4 mt-6 overflow-x-auto rounded-card border-2 border-muted py-8',
		className
	)}
	use:setCodeString
	{...restProps}>
	{@render children()}
	<CopyCodeButton {copyCode} copied={$copied} class={cn('pre-copy-btn absolute right-4 top-4')} />
</pre>
