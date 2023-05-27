// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  safelist: [
    ...[3, 4, 5, 6].map(num => `grid-cols-${num}`),
    ...[3, 4, 5, 6].map(num => `grid-rows-${num}`),
    ...[
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
  ],
  shortcuts: {
    button: "cursor-pointer bg-#8f7a66 color-#FFF rd-4px py-10px px-20px hover:bg-#8F7A66DD",
  },
});
