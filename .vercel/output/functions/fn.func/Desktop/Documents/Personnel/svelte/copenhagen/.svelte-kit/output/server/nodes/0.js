import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.ChhUFNes.js","_app/immutable/chunks/disclose-version.Bedei8AD.js","_app/immutable/chunks/runtime.BAFUM52B.js","_app/immutable/chunks/index-client.KQq4m8LZ.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.BmHREJqO.js","_app/immutable/chunks/entry.Ie7rGrFD.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/store.9yGI1nh7.js","_app/immutable/chunks/attributes.D0NGgthW.js","_app/immutable/chunks/index.DWgPtC_I.js","_app/immutable/chunks/stores.B8GNZjuf.js","_app/immutable/chunks/svelte-component.DMSORSFP.js"];
export const stylesheets = ["_app/immutable/assets/0.ULhG9gpl.css","_app/immutable/assets/Toaster.Dljj2rV8.css"];
export const fonts = [];
