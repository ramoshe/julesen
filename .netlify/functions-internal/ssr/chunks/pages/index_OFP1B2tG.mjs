import { a as getArt, u as urlFor, $ as $$Socials, b as $$Layout } from './about_FqQ4yv7a.mjs';
import { f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_tOZXR6tZ.mjs';
import 'kleur/colors';
import 'cssesc';
/* empty css                          */

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const art = await getArt();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Art Gallery", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="art-container" data-astro-cid-j7pv25f6> ${art.map(
    (art2) => renderTemplate`<a class="glightbox image"${addAttribute(urlFor(art2.mainImage).width(art2.mainImage.width).height(art2.mainImage.height).url(), "href")}${addAttribute(`title: ${art2.title}; description: Year: ${art2.year}<br>Medium: ${art2.medium}<br>Size: ${art2.size};`, "data-glightbox")} data-type="image" data-astro-cid-j7pv25f6> <img class="artpiece"${addAttribute(urlFor(art2.mainImage).width(Math.round(art2.mainImage.width * 0.1)).height(Math.round(art2.mainImage.height * 0.1)).url(), "src")}${addAttribute(art2.title, "alt")} data-astro-cid-j7pv25f6> </a>`
  )} </div> </div> </section> ${renderComponent($$result2, "Socials", $$Socials, { "data-astro-cid-j7pv25f6": true })} ` })}   `;
}, "/Users/rachelsherard/WebProjects/Julesen/src/pages/index.astro", void 0);

const $$file = "/Users/rachelsherard/WebProjects/Julesen/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, prerender, $$url as url };
