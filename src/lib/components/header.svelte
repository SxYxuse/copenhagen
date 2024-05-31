<script>
	import { toggleMode } from 'mode-watcher';
	import { Icons } from './icons';

	import { Button } from './ui/button';
	import { MobileNav } from './navigation';
	import { siteConfig } from '$lib/config';
</script>

<header
	class="sticky top-0 z-50 overflow-x-hidden border-b border-border bg-background/75 backdrop-blur-md"
>
	<div class="container px-4">
		<div class="flex h-[70px] items-center justify-between gap-3">
			<div class="flex items-center gap-1.5">
				<MobileNav />
				<a
					href="/"
					class="ml-2 rounded-md font-quicksand focus-visible:outline-none text-xl font-bold focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
				>
					{siteConfig.name}
				</a>
			</div>
			<div class="flex items-center justify-end gap-2.5">
				<Button on:click={toggleMode} variant="ghost" size="icon">
					<Icons.Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Icons.Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Change theme</span>
				</Button>
			</div>
		</div>
	</div>
</header>
