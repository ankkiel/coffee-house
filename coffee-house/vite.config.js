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
        index: 'index.html',
        menu: 'menu.html',
      },
    },
  },
  css: {
    sourcemap: true,
    devSourcemap: true
  },
});