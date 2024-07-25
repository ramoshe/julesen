import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, u as unescapeHTML, j as renderHead, k as renderSlot, F as Fragment } from '../astro_tOZXR6tZ.mjs';
import 'cssesc';
import { createClient } from '@sanity/client';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_ZoRWJmJK.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';
import { isPortableTextToolkitList, isPortableTextListItemBlock, isPortableTextToolkitSpan, isPortableTextBlock, isPortableTextToolkitTextNode, nestLists, LIST_NEST_MODE_HTML, buildMarksTree } from '@portabletext/toolkit';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
/* empty css                          */

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_ZoRWJmJK.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$j = createAstro("https://julesen.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro/components/Image.astro", void 0);

const $$Astro$i = createAstro("https://julesen.com");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///Users/rachelsherard/WebProjects/Julesen/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const sanityClient = createClient(
            {"apiVersion":"2023-03-20","projectId":"du8x8izk","dataset":"production","studioBasePath":"/admin","useCdn":false}
          );

globalThis.sanityClient = sanityClient;

const $$Astro$h = createAstro("https://julesen.com");
const $$TopBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$TopBar;
  const pathname = new URL(Astro2.request.url).pathname;
  pathname.slice(1);
  return renderTemplate`${maybeRenderHead()}<nav data-astro-cid-lq7i5isa> <div id="navlinks" data-astro-cid-lq7i5isa> <a href="/" data-astro-cid-lq7i5isa>Home</a> <a href="/about" data-astro-cid-lq7i5isa>About</a> </div> </nav> `;
}, "/Users/rachelsherard/WebProjects/Julesen/src/components/TopBar.astro", void 0);

const logo = new Proxy({"src":"/_astro/julesen-logo.JGfhNZqA.jpg","width":4167,"height":4167,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rachelsherard/WebProjects/Julesen/src/assets/julesen-logo.jpg";
							}
							
							return target[name];
						}
					});

const name = new Proxy({"src":"/_astro/julesen-name.-wyNWnC_.png","width":726,"height":445,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/rachelsherard/WebProjects/Julesen/src/assets/julesen-name.png";
							}
							
							return target[name];
						}
					});

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="logo" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Julesen", "data-astro-cid-3ef6ksr2": true })} </div> <div class="name" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "Image", $$Image, { "src": name, "alt": "Julianna Engesser", "data-astro-cid-3ef6ksr2": true })} </div> </header> `;
}, "/Users/rachelsherard/WebProjects/Julesen/src/components/Header.astro", void 0);

const $$BottomBar = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-bk6h52fm> <p data-astro-cid-bk6h52fm>
All work by Juliana Engesser &copy ${year} &nbsp; | &nbsp; Website built with <svg data-sanity-icon="heart-filled" width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-bk6h52fm> <path d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z" fill="currentColor" stroke="currentColor" stroke-width="1.2" data-astro-cid-bk6h52fm></path> </svg> by <a href="https://theramoshe.com" data-astro-cid-bk6h52fm>theRamoShe</a> </p> </footer> `;
}, "/Users/rachelsherard/WebProjects/Julesen/src/components/BottomBar.astro", void 0);

const $$Astro$g = createAstro("https://julesen.com");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$f = createAstro("https://julesen.com");
const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$e = createAstro("https://julesen.com");
const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$d = createAstro("https://julesen.com");
const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$c = createAstro("https://julesen.com");
const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$b = createAstro("https://julesen.com");
const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(name, "name")}${addAttribute(property, "property")}${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}>`)}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$a = createAstro("https://julesen.com");
const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$9 = createAstro("https://julesen.com");
const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$8 = createAstro("https://julesen.com");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is strongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  const baseUrl = Astro2.site ?? Astro2.url;
  const defaultCanonicalUrl = new URL(Astro2.url.pathname + Astro2.url.search, baseUrl);
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || defaultCanonicalUrl.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-seo/src/SEO.astro", void 0);

const $$Astro$7 = createAstro("https://julesen.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "SEO", $$SEO, { "title": "Julesen Art Gallery", "description": "Explore the captivating abstract art of Julianna Engesser. Discover unique modern paintings, vibrant abstract compositions, bold colors, dynamic creativity, and contemporary art.", "openGraph": {
    basic: {
      title: "Julesen Art Gallery",
      type: "website",
      image: "https://julesen.com/Julesen-Art-Gallery.png"
    }
  }, "data-astro-cid-sckkx6r4": true })}<!-- favicon --><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><!-- Google fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"><title>Julesen ~ ${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> <div class="container" data-astro-cid-sckkx6r4> ${renderComponent($$result, "TopBar", $$TopBar, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} <main data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "BottomBar", $$BottomBar, { "data-astro-cid-sckkx6r4": true })} </div>  </body></html>`;
}, "/Users/rachelsherard/WebProjects/Julesen/src/layouts/Layout.astro", void 0);

const icons = {"local":{"prefix":"local","lastModified":1721867363,"icons":{"discord":{"body":"<path fill=\"currentColor\" d=\"M20.992 20.163a2.884 2.884 0 0 1-2.695-3.03v.007a2.867 2.867 0 0 1 2.687-3.023h.008a2.852 2.852 0 0 1 2.695 3.031v-.008a2.859 2.859 0 0 1-2.688 3.022h-.008zm-9.966 0a2.884 2.884 0 0 1-2.695-3.03v.007a2.867 2.867 0 0 1 2.687-3.023h.008a2.852 2.852 0 0 1 2.695 3.031v-.008a2.867 2.867 0 0 1-2.687 3.023h-.008zM26.393 6.465c-1.763-.832-3.811-1.49-5.955-1.871l-.149-.022a.093.093 0 0 0-.098.045c-.234.411-.488.924-.717 1.45l-.043.111a23.042 23.042 0 0 0-6.985.016l.129-.017c-.27-.63-.528-1.142-.813-1.638l.041.077a.095.095 0 0 0-.083-.047l-.016.001h.001a24.594 24.594 0 0 0-6.256 1.957l.151-.064a.084.084 0 0 0-.04.034C2.706 10.538.998 15.566.998 20.993c0 .907.048 1.802.141 2.684l-.009-.11a.103.103 0 0 0 .039.07 24.623 24.623 0 0 0 7.313 3.738l.176.048a.082.082 0 0 0 .028.004c.032 0 .06-.015.077-.038a17.453 17.453 0 0 0 1.485-2.392l.047-.1a.096.096 0 0 0-.052-.132h-.001a16.266 16.266 0 0 1-2.417-1.157l.077.042a.096.096 0 0 1-.048-.083c0-.031.015-.059.038-.076.157-.118.315-.24.465-.364a.094.094 0 0 1 .097-.013h-.001c2.208 1.061 4.8 1.681 7.536 1.681s5.329-.62 7.643-1.727l-.107.046a.094.094 0 0 1 .099.012c.15.124.307.248.466.365a.098.098 0 0 1 .038.077.097.097 0 0 1-.046.082c-.661.395-1.432.769-2.235 1.078l-.105.036a.097.097 0 0 0-.062.089c0 .016.004.031.011.044v-.001c.501.96 1.009 1.775 1.571 2.548l-.04-.057a.096.096 0 0 0 .106.036h-.001c2.865-.892 5.358-2.182 7.566-3.832l-.065.047a.097.097 0 0 0 .039-.069c.087-.784.136-1.694.136-2.615 0-5.415-1.712-10.43-4.623-14.534l.052.078a.078.078 0 0 0-.038-.036z\"/>","width":32,"height":32},"instagram":{"body":"<g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z\" clip-rule=\"evenodd\"/><path d=\"M18 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z\"/><path fill-rule=\"evenodd\" d=\"M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 0 0 2.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 0 0-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 0 0-2.622 2.622ZM13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 0 0-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 0 0 1.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 0 0 1.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 0 0-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3Z\" clip-rule=\"evenodd\"/></g>"},"kick":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M0 0h100v66.7h33.3V33.3h33.4V0h100v100h-33.4v33.3H200v33.4h33.3V200h33.4v100h-100v-33.3h-33.4v-33.4H100V300H0z\" clip-rule=\"evenodd\"/>","width":266.7,"height":300},"tiktok":{"body":"<path fill=\"currentColor\" d=\"M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z\"/>"},"youtube":{"body":"<path fill=\"currentColor\" d=\"m186.8 202.1 95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z\"/>","width":448,"height":512}},"width":24,"height":24}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$6 = createAstro("https://julesen.com");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Socials = createComponent(($$result, $$props, $$slots) => {
  const links = {
    "tiktok": "https://www.tiktok.com/@Julesen",
    "kick": "https://kick.com/julesen",
    "instagram": "#",
    "youtube": "https://youtube.com/@julesen7373",
    "discord": "https://discord.com/invite/xnJNWJcgTJ"
  };
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-upu6fzxr> <div id="socials" data-astro-cid-upu6fzxr> <a${addAttribute(links.tiktok, "href")} target="_blank" class="link cooltipz--top" aria-label="TikTok" data-astro-cid-upu6fzxr>${renderComponent($$result, "Icon", $$Icon, { "name": "tiktok", "class": "icon", "data-astro-cid-upu6fzxr": true })}</a> <a${addAttribute(links.kick, "href")} target="_blank" class="link cooltipz--top" aria-label="Kick" data-astro-cid-upu6fzxr>${renderComponent($$result, "Icon", $$Icon, { "name": "kick", "class": "icon", "data-astro-cid-upu6fzxr": true })}</a> <a${addAttribute(links.instagram, "href")} target="_blank" class="link cooltipz--top" aria-label="Instagram" data-astro-cid-upu6fzxr>${renderComponent($$result, "Icon", $$Icon, { "name": "instagram", "class": "icon", "data-astro-cid-upu6fzxr": true })}</a> <a${addAttribute(links.youtube, "href")} target="_blank" class="link cooltipz--top" aria-label="YouTube" data-astro-cid-upu6fzxr>${renderComponent($$result, "Icon", $$Icon, { "name": "youtube", "class": "icon", "data-astro-cid-upu6fzxr": true })}</a> <a${addAttribute(links.discord, "href")} target="_blank" class="link cooltipz--top" aria-label="Discord" data-astro-cid-upu6fzxr>${renderComponent($$result, "Icon", $$Icon, { "name": "discord", "class": "icon", "data-astro-cid-upu6fzxr": true })}</a> </div> </section> `;
}, "/Users/rachelsherard/WebProjects/Julesen/src/components/Socials.astro", void 0);

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

async function getArt() {
  return await sanityClient.fetch(
    groq`*[_type == "art"] | order(orderRank)`,
  );
}

async function getAbout() {
  return await sanityClient.fetch(
    groq`*[_type == "about"]`,
  );
}

function isComponent(it) {
  return typeof it === "function";
}
function mergeComponents(components, overrides) {
  const cmps = { ...components };
  for (const [key, override] of Object.entries(overrides)) {
    const current = components[key];
    const value = !current || isComponent(override) || isComponent(current) ? override : {
      ...current,
      ...override
    };
    cmps[key] = value;
  }
  return cmps;
}

const getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
const unknownTypeWarning = (type) => getTemplate("type", type);
const unknownMarkWarning = (markType) => getTemplate("mark", markType);
const unknownBlockWarning = (style) => getTemplate("block", style);
const unknownListWarning = (listItem) => getTemplate("list", listItem);
const unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
const getWarningMessage = (nodeType, type) => {
  const fncs = {
    block: unknownBlockWarning,
    list: unknownListWarning,
    listItem: unknownListItemWarning,
    mark: unknownMarkWarning,
    type: unknownTypeWarning
  };
  return fncs[nodeType](type);
};
function printWarning(message) {
  console.warn(message);
}

const key = Symbol("astro-portabletext");
function useContext(node) {
  if (!(key in globalThis)) {
    throw new Error(`PortableText "context" has not been initialised`);
  }
  return globalThis[key](node);
}

const $$Astro$5 = createAstro("https://julesen.com");
const $$Block = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Block;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const styleIs = (style) => style === node.style;
  const { getUnknownComponent } = useContext(node);
  const UnknownStyle = getUnknownComponent();
  return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead()}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/Block.astro", void 0);

const $$HardBreak = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<br>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/HardBreak.astro", void 0);

const $$Astro$4 = createAstro("https://julesen.com");
const $$List = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$List;
  const { node, index, isInline, ...attrs } = Astro2.props;
  const listItemIs = (listItem) => listItem === node.listItem;
  return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead()}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/List.astro", void 0);

const $$Astro$3 = createAstro("https://julesen.com");
const $$ListItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ListItem;
  const { node, index, isInline, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/ListItem.astro", void 0);

const $$Astro$2 = createAstro("https://julesen.com");
const $$Mark = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Mark;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const markTypeIs = (markType) => markType === node.markType;
  const { getUnknownComponent } = useContext(node);
  const UnknownMarkType = getUnknownComponent();
  return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead()}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/Mark.astro", void 0);

const $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);

const $$UnknownList = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/UnknownList.astro", void 0);

const $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);

const $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);

const $$Astro$1 = createAstro("https://julesen.com");
const $$UnknownType = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$UnknownType;
  const { node, isInline } = Astro2.props;
  const warning = getWarningMessage("type", node._type);
  return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead()}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/UnknownType.astro", void 0);

const $$Astro = createAstro("https://julesen.com");
const $$PortableText = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PortableText;
  const {
    value,
    components: componentOverrides = {},
    listNestingMode = LIST_NEST_MODE_HTML,
    onMissingComponent = true,
    class: astroClass
  } = Astro2.props;
  const components = mergeComponents(
    {
      type: {},
      unknownType: $$UnknownType,
      block: {
        h1: $$Block,
        h2: $$Block,
        h3: $$Block,
        h4: $$Block,
        h5: $$Block,
        h6: $$Block,
        blockquote: $$Block,
        normal: $$Block
      },
      unknownBlock: $$UnknownBlock,
      list: {
        bullet: $$List,
        number: $$List,
        menu: $$List
      },
      unknownList: $$UnknownList,
      listItem: {
        bullet: $$ListItem,
        number: $$ListItem,
        menu: $$ListItem
      },
      unknownListItem: $$UnknownListItem,
      mark: {
        code: $$Mark,
        em: $$Mark,
        link: $$Mark,
        "strike-through": $$Mark,
        strong: $$Mark,
        underline: $$Mark
      },
      unknownMark: $$UnknownMark,
      hardBreak: $$HardBreak
    },
    componentOverrides
  );
  const noop = () => {
  };
  const missingComponentHandler = ((handler) => {
    if (typeof handler === "function") {
      return handler;
    }
    return !handler ? noop : printWarning;
  })(onMissingComponent);
  const serializeNode = (isInline) => (node, index = 0) => asComponentProps(node, index, isInline);
  const serializeChildren = (node, isInline) => node.children.map(serializeNode(isInline));
  const serializeMarksTree = (node) => buildMarksTree(node).map(serializeNode(true));
  const asComponentProps = (node, index, isInline) => ({
    node,
    index,
    isInline,
    class: astroClass
  });
  const provideComponent = (nodeType, type) => {
    const component = components[nodeType];
    return isComponent(component) ? component : component[type] ?? missingComponentHandler(getWarningMessage(nodeType, type), {
      nodeType,
      type
    });
  };
  const prepareForRender = (props) => {
    const { node } = props;
    return isPortableTextToolkitList(node) ? [
      provideComponent("list", node.listItem) ?? components.unknownList,
      serializeChildren(node, false)
    ] : isPortableTextListItemBlock(node) ? [
      provideComponent("listItem", node.listItem) ?? components.unknownListItem,
      serializeMarksTree(node).map((children) => {
        if (node.style !== "normal") {
          const { listItem, ...blockNode } = node;
          children = serializeNode(false)(blockNode, 0);
        }
        return children;
      })
    ] : isPortableTextToolkitSpan(node) ? [
      provideComponent("mark", node.markType) ?? components.unknownMark,
      serializeChildren(node, true)
    ] : isPortableTextBlock(node) ? [
      provideComponent(
        "block",
        node.style ?? (node.style = "normal")
        /* Make sure style has been set */
      ) ?? components.unknownBlock,
      serializeMarksTree(node)
    ] : isPortableTextToolkitTextNode(node) ? [
      "\n" === node.text && isComponent(components.hardBreak) ? components.hardBreak : node.text,
      []
    ] : [provideComponent("type", node._type) ?? components.unknownType, []];
  };
  globalThis[key] = (node) => {
    return {
      getDefaultComponent: provideDefaultComponent.bind(null, node),
      getUnknownComponent: provideUnknownComponent.bind(null, node)
    };
  };
  const provideDefaultComponent = (node) => {
    return isPortableTextToolkitList(node) ? $$List : isPortableTextListItemBlock(node) ? $$ListItem : isPortableTextToolkitSpan(node) ? $$Mark : isPortableTextBlock(node) ? $$Block : isPortableTextToolkitTextNode(node) ? $$HardBreak : $$UnknownType;
  };
  const provideUnknownComponent = (node) => {
    return isPortableTextToolkitList(node) ? components.unknownList : isPortableTextListItemBlock(node) ? components.unknownListItem : isPortableTextToolkitSpan(node) ? components.unknownMark : isPortableTextBlock(node) ? components.unknownBlock : !isPortableTextToolkitTextNode(node) ? components.unknownType : (() => {
      throw new Error(
        `[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`
      );
    })();
  };
  const blocks = Array.isArray(value) ? value : [value];
  function* renderBlocks() {
    for (const it of nestLists(blocks, listNestingMode)) {
      yield asComponentProps(it, 0, false);
    }
  }
  return renderTemplate`${[...renderBlocks()].map(function render(props) {
    const [Cmp, children] = prepareForRender(props);
    return !isComponent(Cmp) ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${Cmp}` })}` : renderTemplate`${renderComponent($$result, "Cmp", Cmp, { ...props }, { "default": ($$result2) => renderTemplate`${children.map(render)}` })}`;
  })}`;
}, "/Users/rachelsherard/WebProjects/Julesen/node_modules/astro-portabletext/components/PortableText.astro", void 0);

const prerender = false;
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const about = await getAbout();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Jules", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-kh7btl4r> <div class="container" data-astro-cid-kh7btl4r> <div class="portrait" data-astro-cid-kh7btl4r> ${about[0].portrait ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": urlFor(about[0].portrait).width(about[0].portrait.width).height(about[0].portrait.height).url(), "alt": "Jules Portrait", "width": about[0].portrait.width, "height": about[0].portrait.height, "data-astro-cid-kh7btl4r": true })}` : null} </div> <div class="content" data-astro-cid-kh7btl4r> ${about[0].content ? about[0].content.map(
    (section) => renderTemplate`<h2 class="section-title" data-astro-cid-kh7btl4r>${section.sectionTitle}</h2>
          ${renderComponent($$result2, "PortableText", $$PortableText, { "value": section.sectionText, "class": "section-text", "data-astro-cid-kh7btl4r": true })}`
  ) : null} </div> </div> </section> ${renderComponent($$result2, "Socials", $$Socials, { "data-astro-cid-kh7btl4r": true })} ` })}  <style>
  .section-title {
    font-family: var(--font-display);
    font-size: 2em;
    color: var(--primary-dark);
    line-height: 1em;
    margin: 0;
  }
  .section-text {
    margin-bottom: 3em;
  }
</style>`;
}, "/Users/rachelsherard/WebProjects/Julesen/src/pages/about.astro", void 0);

const $$file = "/Users/rachelsherard/WebProjects/Julesen/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Socials as $, getArt as a, $$Layout as b, about as c, getConfiguredImageService as g, imageConfig as i, urlFor as u };
