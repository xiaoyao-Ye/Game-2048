<template>
  <div class="of-hidden px-20px flex items-center justify-center flex-col max-w-600px animate-fade-in">
    <GameHeader />

    <Board />

    <BoardSizePicker />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import GameHeader from "./GameHeader.vue";
import Board from "./Board.vue";
import BoardSizePicker from "./BoardSizePicker.vue";

import { onReset, keydownHandle, touchStartHandle, touchEndHandle } from "@/hooks/Game";

const preventTouchMove = (e: TouchEvent) => {
  e.preventDefault();
};

onMounted(() => {
  onReset();
  window.addEventListener("keydown", keydownHandle);
  window.addEventListener("touchstart", touchStartHandle);
  window.addEventListener("touchend", touchEndHandle);
  window.addEventListener("touchmove", preventTouchMove, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownHandle);
  window.removeEventListener("touchstart", touchStartHandle);
  window.removeEventListener("touchend", touchEndHandle);
  window.removeEventListener("touchmove", preventTouchMove);
});
</script>

<style scoped></style>
