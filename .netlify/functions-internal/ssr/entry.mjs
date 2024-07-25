import { renderers } from './renderers.mjs';
import { manifest } from './manifest_jJ3zpeMQ.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_HraslnPy.mjs');
const _page1 = () => import('./chunks/studio-route_n9FhIzCm.mjs');
const _page2 = () => import('./chunks/index_1PK4m9Rz.mjs');
const _page3 = () => import('./chunks/about_z2eqzOXn.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/@narration-sd/sanity-astro/dist/studio/studio-route.astro", _page1],
    ["src/pages/index.astro", _page2],
    ["src/pages/about.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "4dd24d9f-d7f6-4502-98ca-e6a4e9fb495f"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
