import 'cookie';
import 'kleur/colors';
import 'string-width';
import './chunks/astro_tOZXR6tZ.mjs';
import 'clsx';
import 'cssesc';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/admin/[...params]","pattern":"^\\/admin(?:\\/(.*?))?\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@narration-sd/sanity-astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.K_uxzZeg.js"}],"styles":[{"type":"external","src":"/_astro/hoisted.qFEukeNZ.css"},{"type":"external","src":"/_astro/about.BwKYgOqi.css"},{"type":"inline","content":".gslide-desc{font-family:var(--font-primary)!important;font-size:110%!important}.gslide-title{font-family:var(--font-primary)!important;font-weight:bolder!important;font-size:150%!important;margin-top:0!important}.container[data-astro-cid-j7pv25f6]{width:100%;height:auto;max-width:1400px;margin:2em auto;padding-bottom:10em;display:flex;justify-content:center;overflow:hidden}.art-container[data-astro-cid-j7pv25f6]{width:100%;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:5em}.artpiece[data-astro-cid-j7pv25f6]{border:20px solid var(--white);box-shadow:#00000029 0 3px 6px,#0000003b 0 3px 6px;max-width:80vw;max-height:80vw;transition:box-shadow .5s ease}.artpiece[data-astro-cid-j7pv25f6]:hover{box-shadow:#0000004d 0 19px 38px,#00000038 0 15px 12px}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.l-JsOPk0.js"}],"styles":[{"type":"external","src":"/_astro/about.BwKYgOqi.css"},{"type":"inline","content":".container[data-astro-cid-kh7btl4r]{display:flex;align-items:center;justify-content:center;max-width:1200px;margin:0 auto;gap:5em}.portrait[data-astro-cid-kh7btl4r] img[data-astro-cid-kh7btl4r]{width:400px;height:auto;border:20px solid var(--white);box-shadow:#0003 0 18px 50px -10px}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://julesen.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/rachelsherard/WebProjects/Julesen/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/rachelsherard/WebProjects/Julesen/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/rachelsherard/WebProjects/Julesen/node_modules/@narration-sd/sanity-astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_e2wU0Fsd.mjs","/src/pages/index.astro":"chunks/pages/index_OFP1B2tG.mjs","/node_modules/@narration-sd/sanity-astro/dist/studio/studio-route.astro":"chunks/pages/studio-route_zJ6A3llW.mjs","\u0000@astrojs-manifest":"manifest_jJ3zpeMQ.mjs","/Users/rachelsherard/WebProjects/Julesen/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_3wEZly-Z.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_HraslnPy.mjs","\u0000@astro-page:node_modules/@narration-sd/sanity-astro/dist/studio/studio-route@_@astro":"chunks/studio-route_n9FhIzCm.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_1PK4m9Rz.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_z2eqzOXn.mjs","/Users/rachelsherard/WebProjects/Julesen/node_modules/sanity/lib/_chunks/resources-9TIIL7Ur.js":"_astro/resources-9TIIL7Ur.PZ4yJKmO.js","/Users/rachelsherard/WebProjects/Julesen/node_modules/@narration-sd/sanity-astro/dist/studio/studio-component":"_astro/studio-component.567gMMob.js","/Users/rachelsherard/WebProjects/Julesen/node_modules/sanity/lib/_chunks/index-HcF369ru.js":"_astro/index-HcF369ru.1bHxiRE7.js","/Users/rachelsherard/WebProjects/Julesen/node_modules/sanity/lib/_chunks/resources-u_a8Mu5V.js":"_astro/resources-u_a8Mu5V.mSn3Gtul.js","/Users/rachelsherard/WebProjects/Julesen/node_modules/sanity/lib/_chunks/index-2kSxso3r.js":"_astro/index-2kSxso3r.z8MajWNh.js","@astrojs/react/client.js":"_astro/client.piQ89wA3.js","/Users/rachelsherard/WebProjects/Julesen/node_modules/@sanity/client/dist/_chunks/stegaEncodeSourceMap-gZIRaYar.js":"_astro/stegaEncodeSourceMap-gZIRaYar.ydZxifCZ.js","/astro/hoisted.js?q=1":"_astro/hoisted.l-JsOPk0.js","/Users/rachelsherard/WebProjects/Julesen/node_modules/sanity/lib/_chunks/index-MAAxgUnl.js":"_astro/index-MAAxgUnl.GGQFlL6I.js","/astro/hoisted.js?q=0":"_astro/hoisted.K_uxzZeg.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/julesen-name.-wyNWnC_.png","/_astro/julesen-logo.JGfhNZqA.jpg","/_astro/about.BwKYgOqi.css","/Julesen-Art-Gallery.png","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/site.webmanifest","/_astro/_commonjsHelpers.4gQjN7DL.js","/_astro/browser.rLAhvx4p.js","/_astro/client.piQ89wA3.js","/_astro/client.s--nOq3Y.js","/_astro/hoisted.K_uxzZeg.js","/_astro/hoisted.l-JsOPk0.js","/_astro/hoisted.qFEukeNZ.css","/_astro/index-2kSxso3r.z8MajWNh.js","/_astro/index-HcF369ru.1bHxiRE7.js","/_astro/index-MAAxgUnl.GGQFlL6I.js","/_astro/resources-9TIIL7Ur.PZ4yJKmO.js","/_astro/resources-u_a8Mu5V.mSn3Gtul.js","/_astro/stegaEncodeSourceMap-gZIRaYar.ydZxifCZ.js","/_astro/studio-component.567gMMob.js","/_astro/studio-component.V7_5SUjD.js"],"buildFormat":"directory"});

export { manifest };
