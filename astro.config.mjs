import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
import liveCode from "astro-live-code";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { h } from "hastscript";
const AnchorLinkIcon = h(
  "span",
  { ariaHidden: "true", class: "anchor-icon" },
  // 或者使用 hast-util-from-html 来从html字符串构建hast.
  h(
    "svg",
    { width: 24, height: 24, viewBox: "0 0 24 24" },
    h("path", {
      fill: "currentcolor",
      d: "m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z",
    }),
  ),
);

import rehypeCallout from "rehype-callout";

import { fileURLToPath } from "node:url";

function resolvePath(path) {
  return fileURLToPath(new URL(path, import.meta.url));
}
// 自定义client: 指令， 实现点击水合激活
import clickDirective from "./astro-click-directive/register.js";





// 目前tailwind不能用于lightningcss
// import {browserslistToTargets} from 'lightningcss';
// import browserslist from 'browserslist'

// https://astro.build/config
export default defineConfig({
  site: "https://shawspring.github.io",
  base: "/blog/",
  // any url is based on https://shawspring.github.io/blog/
  // so all of your internal page links must be prefixed with your base value, eg:  <a href={`/blog/tags/${tag}`}>{tag} </a>}</Tag>
  integrations: [
    starlight({
      title: "ShawSpring",
      social: {
        github: "https://github.com/shawspring",
      },
      logo: {
        src: resolvePath("./src/assets/ss.png"),
      },
      tableOfContents: false,
      favicon: "/ss.png",
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/ShawSpring/blog/edit/main/",
      },
      // https://github.com/ShawSpring/blog/edit/main/src/content/docs/reference/RelatedResources.mdx
      // pagination: false,//* 默认有分页导航
      sidebar: [
        {
          label: "React",
          autogenerate: {
            directory: "react",
          },
        },
        {
          label: "projects",
          collapsed: false,
          autogenerate: {
            directory: "projects",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "tags",
          link: "/tags/",
        },
      ],
      components: {
        MarkdownContent: resolvePath(
          "./src/compsForDocs/MarkdownContent.astro",
        ),
      },
      expressiveCode: {
        // themes: ['github-light-default', 'github-dark-default'],
        themes: ["rose-pine-dawn", "rose-pine"],
      },
      customCss: [resolvePath("./src/styles/tailwind.css")],

      credits: false,
    }),
    react(),
    tailwind({}),
    liveCode({
      layout: resolvePath("./src/compsForDocs/LiveCode.astro"),
      defaultProps: {
        // apply client directives to all components
        "client:load": true,
      },
    }),
    clickDirective(),
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: "_heading-anchor",
            ariaHidden: true,
            tabIndex: -1,
          },
          content: AnchorLinkIcon,
        },
      ],
      // 内部样式 不受 starlight 影响
      [rehypeCallout,{customClassNames:['not-content']}]
    ],
  },
  vite: {
    css: {
      //! 目前tailwind 还是基于postcss, 使用 lightnigcss会使tailwind 不生效
      //   transformer:"lightningcss",
      //  lightningcss:{
      //   // 必须要这句，默认的值有问题
      //   targets: browserslistToTargets(browserslist('defaults')),
      //  }
    },
    build: {
      // cssMinify:"lightningcss"
    },
  },
});


