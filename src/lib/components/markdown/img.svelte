<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		src: HTMLImgAttributes['src'];
		alt: HTMLImgAttributes['alt'];
		class?: string | undefined | null;
		restProps?: SvelteRestProps;
	};

	let {
		src = undefined,
		alt = undefined,
		class: className = undefined,
		...restProps
	}: Props = $props();
</script>

<img {src} {alt} class={cn('rounded-md', className)} {...restProps} />
