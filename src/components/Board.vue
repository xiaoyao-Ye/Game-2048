<template>
  <div
    class="relative w-full grid grid-gap-8px p-8px rd-8px bg-#bbada0"
    :class="[`grid-cols-${MAP_SIZE}`, `grid-rows-${MAP_SIZE}`]">
    <div
      class="relative pt-100% h-0 text-32px fw-bold text-#776e65 bg-#cdc1b4 rd-8px"
      v-for="(cell, rowIndex) in board.flat()"
      :key="cell.id + rowIndex">
      <!-- TODO: 这里应该可以去掉外面这层? 封装一个 BoardTile 组件? -->
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center rd-8px"
        :class="setBG(cell.value)"
        :style="cell.style">
        {{ cell.value || "" }}
      </div>
    </div>

    <Overlay />
  </div>
</template>

<script setup lang="ts">
import Overlay from "./Overlay.vue";
import { MAP_SIZE, board } from "@/hooks/Game";

defineOptions({
  name: "Board",
});

const setBG = (value: number) => {
  const colors = [
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
  ];
  return "bg-" + (colors[Math.log2(value)] ?? colors[0]);
};
</script>

<style scoped></style>
