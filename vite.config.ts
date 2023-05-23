// Import the defineConfig function from the Vite library
import { defineConfig } from "vite";

// Import the Vue plugin from the Vite library
import vue from "@vitejs/plugin-vue";

// Export the configuration object for Vite
export default defineConfig({
  // Use the Vue plugin
  plugins: [vue()],
});
