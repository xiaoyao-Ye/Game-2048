// Import the defineConfig function from the Vite library
// import { defineConfig } from "vite";
import { defineConfig } from "vitest/config";
import UnoCSS from "unocss/vite";
import path from "path";

function resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// Import the Vue plugin from the Vite library
import vue from "@vitejs/plugin-vue";

// Export the configuration object for Vite
export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
    },
  },
  base: "/Game-2048",
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  // Use the Vue plugin
  plugins: [vue(), UnoCSS()],
});
