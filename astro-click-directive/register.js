// 添加自定义client 指令，实现点击水合激活 
// https://docs.astro.build/zh-cn/reference/integrations-reference/#addclientdirective-%E9%80%89%E9%A1%B9
/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
    name: "client:click",
    hooks: {
      "astro:config:setup": ({ addClientDirective }) => {
        addClientDirective({
          name: "click",
          entrypoint: "./astro-click-directive/click.js",
        });
      },
    },
  });

