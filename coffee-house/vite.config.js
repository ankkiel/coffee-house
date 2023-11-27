import { defineConfig } from "vite";

export default defineConfig({
  base: './',
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
   
    minify: false,
    cssCodeSplit: false,

    rollupOptions: {
      input: {
        index: 'pages/home/index.html',
        menu: 'pages/menu/index.html',
      },
    },
  },
  css: {
    sourcemap: true,
    devSourcemap: true
  },
});