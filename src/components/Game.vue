<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { MAP_SIZE, board, reset, createTile, move } from "./Game";

onMounted(() => {
  reset();
  createTile();
  createTile();
  console.log(MAP_SIZE);
  console.log(board.value);
  console.log(move);
});
</script>

<style scoped></style>
