import { defineConfig } from "astro/config";

import react from "@astrojs/react";

export default defineConfig({
  vite: {
    build: {
      minify: false,
      base: "https://thinkle-iacs.github.io/apcsp-portfolio-demo/",
    },
  },

  integrations: [react()],
});
