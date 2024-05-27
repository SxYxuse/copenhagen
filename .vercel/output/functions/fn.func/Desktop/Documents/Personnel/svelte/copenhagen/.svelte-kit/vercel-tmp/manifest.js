export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/quicksand/Quicksand-Bold.eot","fonts/quicksand/Quicksand-Bold.ttf","fonts/quicksand/Quicksand-Bold.woff","fonts/quicksand/Quicksand-Bold.woff2","fonts/quicksand/Quicksand-Light.eot","fonts/quicksand/Quicksand-Light.ttf","fonts/quicksand/Quicksand-Light.woff","fonts/quicksand/Quicksand-Light.woff2","fonts/quicksand/Quicksand-Medium.eot","fonts/quicksand/Quicksand-Medium.ttf","fonts/quicksand/Quicksand-Medium.woff","fonts/quicksand/Quicksand-Medium.woff2","fonts/quicksand/Quicksand-Regular.eot","fonts/quicksand/Quicksand-Regular.ttf","fonts/quicksand/Quicksand-Regular.woff","fonts/quicksand/Quicksand-Regular.woff2","fonts/quicksand/Quicksand-SemiBold.eot","fonts/quicksand/Quicksand-SemiBold.ttf","fonts/quicksand/Quicksand-SemiBold.woff","fonts/quicksand/Quicksand-SemiBold.woff2"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf",".woff":"font/woff",".woff2":"font/woff2"},
	_: {
		client: {"start":"_app/immutable/entry/start.Ckx-DEvp.js","app":"_app/immutable/entry/app.HqDmpUJI.js","imports":["_app/immutable/entry/start.Ckx-DEvp.js","_app/immutable/chunks/entry.Ie7rGrFD.js","_app/immutable/chunks/runtime.BAFUM52B.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.HqDmpUJI.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/runtime.BAFUM52B.js","_app/immutable/chunks/disclose-version.Bedei8AD.js","_app/immutable/chunks/index-client.KQq4m8LZ.js","_app/immutable/chunks/svelte-component.DMSORSFP.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
