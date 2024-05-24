<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Icons } from '$lib/components/icons';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<ModeWatcher />

<header class="max-w-screen-lg py-4 mx-auto w-full flex flex-row items-center justify-between">
	<a href="/" class="text-2xl">The Copenhagen Book</a>
	<Button on:click={toggleMode} variant="ghost" size="icon">
		<Icons.Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Icons.Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Changer de thème</span>
	</Button>
</header>

<main class="max-w-screen-lg py-4 mx-auto w-full flex flex-col">
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="lg:w-1/5">cc</aside>
		<div class="flex-1 lg:max-w-screen-lg">
			{@render children()}
		</div>
	</div>
</main>
