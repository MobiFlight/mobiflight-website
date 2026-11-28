import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Pages that shouldn't appear in search results
const notInSitemap = ["/download/thank-you/", "/newsletter/thank-you/", "/auth/"];

// https://astro.build/config
export default defineConfig({
  site: "https://mobiflight.com",

  vite: {
      plugins: [tailwindcss()],
  server: {
    watch: {
      usePolling: true,
    },

    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
	},

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !notInSitemap.some((path) => new URL(page).pathname.startsWith(path)),
    }),
  ],
});