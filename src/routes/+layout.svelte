<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { SidebarNav } from '$lib/components/navigation';
	import { navigation } from '$lib/config';
	import { Header, Metadata } from '$lib/components';
	import { TableOfContents } from '$lib/components/toc';
	import { Toaster } from 'svelte-sonner';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<ModeWatcher />

<Metadata />

<Toaster richColors />

<Header />

<div class="min-h-[calc(100vh-64px)]">
	<div
		class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10"
	>
		<SidebarNav items={navigation.sidebar} />
		<main
			class={cn(
				'relative pb-6 pl-4 pr-4 pt-16 md:pl-0 lg:gap-10 xl:grid-cols-[1fr_220px]',
				$page.error ?? 'xl:grid'
			)}
		>
			<div class="mx-auto w-full min-w-0 md:max-w-[700px]" id="content">
				{@render children()}
			</div>

			{#if !$page.error}
				<div class="hidden text-sm xl:block">
					<div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
						<TableOfContents />
					</div>
				</div>
			{/if}
		</main>
	</div>
</div>
