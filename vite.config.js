import { defineConfig } from "vite";

function getBase() {
  if (process.env.GITHUB_REPOSITORY) {
    return `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`;
  } else {
    return "/";
  }
}

export default defineConfig({
  vite: {
    build: {
      minify: false,
      base: getBase(),
    },
  },
});
