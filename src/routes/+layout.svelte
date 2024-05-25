<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Icons } from '$lib/components/icons';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	type Props = {
		data: LayoutData;
		children: Snippet;
	};

	let { data, children }: Props = $props();
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

<main class="max-w-screen-lg py-4 mx-auto w-full">
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="lg:w-1/5 sticky top-0">
			<div class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
				<a href="/" class="text-sm font-bold">Guides</a>
				{#each data.pages as p}
					{@const isActive = $page.url.pathname === '/' + p.slug}
					<a
						href={p.slug}
						class={cn('text-sm py-1', { 'text-blue-600 dark:text-blue-500': isActive })}
						>{p.title}</a
					>
				{/each}
			</div>
		</aside>
		<div class="flex-1 lg:max-w-screen-md">
			{@render children()}
		</div>
	</div>
</main>
