//! Astro 内置了postcss, 不用安装，只需安装插件即可
export default ({ env }) => {
  return {
    plugins: {
      // "postcss-import": {},
      // tailwindcss: {},
      // postcss-preset-env 包含了postcss-nested和autoprefixer
      "postcss-preset-env": { },
    },
  }
};
