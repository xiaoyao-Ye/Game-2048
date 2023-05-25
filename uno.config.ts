// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  safelist: [
    "#ccc0b3",
    "#eee4da",
    "#ede0c8",
    "#f2b179",
    "#f59563",
    "#f67c5f",
    "#f65e3b",
    "#edcf72",
    "#edcc61",
    "#edc850",
    "#edc53f",
    "#edc22e",
  ].map(color => `bg-${color}`),
});
