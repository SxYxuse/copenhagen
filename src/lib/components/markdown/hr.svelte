<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		class?: string | undefined | null;
		restProps?: SvelteRestProps;
	};

	let { class: className = undefined, ...restProps }: Props = $props();
</script>

<hr class={cn('my-4 md:my-8', className)} {...restProps} />
