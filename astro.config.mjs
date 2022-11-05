import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://u10.jp",
  integrations: [react(), svelte(), compress()],
});
