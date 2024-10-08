// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    react(),
    db(),
  ],

  security: {
		checkOrigin: true
	}
});
