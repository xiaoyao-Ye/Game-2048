<template>
  <div class="of-hidden px-20px flex items-center justify-center flex-col max-w-600px animate-fade-in">
    <GameHeader />

    <Board />

    <BoardSizePicker />
  </div>
</template>

<script setup lang="ts">
import GameHeader from "./GameHeader.vue";
import Board from "./Board.vue";
import BoardSizePicker from "./BoardSizePicker.vue";
import { useGame } from "@/hooks/Game";

useGame();
</script>

<style scoped></style>
