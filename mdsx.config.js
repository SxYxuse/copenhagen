// import { readFileSync } from 'node:fs';
// import { resolve } from 'node:path';
// import { fileURLToPath } from 'node:url';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { codeImport } from 'remark-code-import';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { getHighlighter } from 'shiki';
import { defineConfig } from 'mdsx';

// const __dirname = fileURLToPath(new URL('.', import.meta.url));

// /** @type {import('@mdsx/rehype-custom-highlighter').HighlightOptions} */
// const customHighlightOptions = {
// 	highlight: async ({ value, lang }) => {
// 		const highlighter = await getHighlighter({
// 			langs: [
// 				'plaintext',
// 				import('shikiji/langs/typescript.mjs'),
// 				import('shikiji/langs/go.mjs'),
// 				import('shikiji/langs/svelte.mjs')
// 			],
// 			themes: [import('shikiji/themes/github-dark.mjs')]
// 		});
// 		const html = highlighter.codeToHtml(value, {
// 			lang: lang,
// 			theme: 'github-dark'
// 		});
// 		return html;
// 	}
// };

// export const mdsxConfig = defineConfig({
// 	extensions: ['.md'],
// 	rehypePlugins: [[rehypeCustomHighlight, customHighlightOptions]]
// });

const prettyCodeOptions = {
	// theme: JSON.parse(String(readFileSync(resolve(__dirname, './other/themes/dark.json')))),
	getHighlighter: (options) =>
		getHighlighter({
			...options,
			langs: [
				'plaintext',
				import('shiki/langs/javascript.mjs'),
				import('shiki/langs/typescript.mjs'),
				import('shiki/langs/css.mjs'),
				import('shiki/langs/svelte.mjs'),
				import('shiki/langs/shellscript.mjs'),
				import('shiki/langs/markdown.mjs')
			]
		}),
	keepBackground: true,
	onVisitLine(node) {
		if (node.children.length === 0) {
			// @ts-expect-error - we're changing the node type
			node.children = { type: 'text', value: ' ' };
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ['line--highlighted'];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ['chars--highlighted'];
	}
};

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, codeImport, remarkRemovePrettierIgnore],
	rehypePlugins: [
		rehypeSlug,
		rehypePreData,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeHandleMetadata
	]
	// blueprints: {
	// 	default: {
	// 		path: resolve(__dirname, "./src/lib/components/docs/markdown/blueprint.svelte"),
	// 	},
	// },
});

function remarkRemovePrettierIgnore() {
	return async (tree) => {
		visit(tree, 'code', (node) => {
			node.value = node.value
				.replaceAll('<!-- prettier-ignore -->\n', '')
				.replaceAll('// prettier-ignore\n', '');
		});
	};
}

function rehypePreData() {
	return (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'pre') {
				const [codeEl] = node.children;
				if (codeEl.type !== 'element') return;
				if (codeEl.tagName !== 'code') return;

				if (
					codeEl.data &&
					'meta' in codeEl.data &&
					codeEl.data.meta &&
					typeof codeEl.data.meta === 'string'
				) {
					// Extract event from meta and pass it down the tree.
					const regex = /event="([^"]*)"/;
					const match = codeEl.data?.meta.match(regex);
					if (match) {
						// @ts-expect-error - this is fine
						node.__event__ = match ? match[1] : null;
						codeEl.data.meta = codeEl.data.meta.replace(regex, '');
					}
				}

				// @ts-expect-error - this is fine
				node.__rawString__ = codeEl.children?.[0].value;
				// @ts-expect-error - this is fine
				node.__src__ = node.properties?.__src__;
				// @ts-expect-error - this is fine
				node.__style__ = node.properties?.__style__;
			}
		});
	};
}

function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'figure') {
				if (!('data-rehype-pretty-code-figure' in node.properties)) {
					return;
				}

				const preElement = node.children.at(-1);
				if (preElement && 'tagName' in preElement && preElement.tagName !== 'pre') {
					return;
				}

				const firstChild = node.children.at(0);

				if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'figcaption') {
					node.properties['data-metadata'] = '';
					const lastChild = node.children.at(-1);
					if (lastChild && 'properties' in lastChild) {
						lastChild.properties['data-metadata'] = '';
					}
				}
			}
		});
	};
}
