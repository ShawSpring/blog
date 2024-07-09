import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
import liveCode from 'astro-live-code'

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { fileURLToPath } from "node:url";

function resolvePath(path){
  return fileURLToPath(new URL(path, import.meta.url))
}

// 目前tailwind不能用于lightningcss
// import {browserslistToTargets} from 'lightningcss';
// import browserslist from 'browserslist'

// https://astro.build/config
export default defineConfig({
  site: 'https://shawspring.github.io',
  base: '/blog/',
  // any url is based on https://shawspring.github.io/blog/ 
  // so all of your internal page links must be prefixed with your base value, eg:  <a href={`/blog/tags/${tag}`}>{tag} </a>}</Tag>
  integrations: [starlight({
    title: "ShawSpring",
    social: {
      github: "https://github.com/shawspring",
    },
    logo:{
      src:resolvePath("./src/assets/ss.png"),
    },
    favicon:"/ss.png",
    lastUpdated:true,
    editLink: {
      baseUrl: 'https://github.com/ShawSpring/blog/edit/main/',
    },
    // https://github.com/ShawSpring/blog/edit/main/src/content/docs/reference/RelatedResources.mdx
    // pagination: false,//* 默认有分页导航
    sidebar: [{
      label: "React",
      autogenerate:{
        directory: "react"
      }
      // items: [
      // // Each item here is one entry in the navigation menu.
      // {
      //   label: "Example Guide",
      //   link: "/guides/example/"
      // }, {
      //   label: "Components",
      //   link: "/guides/components/"
      // }, {
      //   label: "Expressive Code",
      //   link: "/guides/expressive-code/"
      // }]
    }, {
      label: "Reference",
      autogenerate: {
        directory: "reference"
      },
    },
    {
      label: "tags",
      link:"/tags/"
    }],
    expressiveCode:{
      // themes: ['github-light-default', 'github-dark-default'],
      themes:['rose-pine-dawn','rose-pine'],
    },
    customCss:[
      resolvePath("./src/styles/tailwind.css"),
    ],
    
    credits:false
  }), 
  react(), 
  tailwind({}),
  liveCode({
    layout: resolvePath('./src/compsForDocs/LiveCode.astro'),
    defaultProps:{
       // apply client directives to all components
       'client:load': true,
    }
  })
],
markdown:{
  rehypePlugins: [rehypeSlug,[rehypeAutolinkHeadings, { behavior: 'prepend',
    properties: {
      className: '_heading-anchor',
    },
    content: {
    type: 'element',
    tagName: 'span',
    children: [{ type: 'text', value: '#' }],
  }}]],
},
  vite:{
    css:{
      //! 目前tailwind 还是基于postcss, 使用 lightnigcss会使tailwind 不生效
    //   transformer:"lightningcss",
    //  lightningcss:{
    //   // 必须要这句，默认的值有问题
    //   targets: browserslistToTargets(browserslist('defaults')), 
    //  }
    },
    build:{
      // cssMinify:"lightningcss"
    }
  }
});