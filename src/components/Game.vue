<template>
  <div class="flex items-center justify-center flex-col">
    <div class="score">score: {{ score }}</div>
    <div class="flex flex-col justify-between w-400px h-400px p-8px rd-8px bg-#bbada0 hidden">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex justify-between h-95px">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="flex items-center justify-center w-95px text-32px fw-bold text-#776e65 bg-#cdc1b4 rd-8px animate-fade-in"
          :class="`bg-${setBG(cell.value)}`">
          {{ cell.value || "" }}
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="reset">New Game</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { board, score, reset, createTile, addTile, keydownHandle } from "./Game";
onMounted(() => {
  reset();
  addTile(createTile());
  addTile(createTile());

  window.addEventListener("keydown", keydownHandle);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownHandle);
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
  return colors[Math.log2(value)] || colors[0];
};
</script>

<style scoped></style>
