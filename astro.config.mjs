import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    build: {
      minify: false,
      base: "https://thinkle-iacs.github.io/apcsp-portfolio-demo/",
    },
  },
});
