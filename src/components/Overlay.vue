<template>
  <!-- <div
    v-show="gameOver"
    class="absolute w-full h-full flex flex-col justify-center items-center text-6xl fw-bold color-#776e65 bg-#EEEEEE99">
    <div>Game over!</div>
    <div class="button mt-20px text-xl" @click="onReset">Try again</div>
  </div>
  <div
    v-show="win"
    class="absolute w-full h-full flex flex-col justify-center items-center text-6xl fw-bold color-#FFFFFF bg-#EEEE0066">
    <div>You win!</div>
    <div class="button mt-20px text-xl" @click="win = false">Keep going</div>
    <div class="button mt-20px text-xl" @click="onReset">Try again</div>
  </div> -->

  <div
    v-show="gameOver || gameWin"
    :class="`absolute w-full h-full flex flex-col justify-center items-center text-6xl fw-bold ${
      gameWin ? 'color-#FFFFFF bg-#EEEE0066' : 'color-#776e65 bg-#EEEEEE99'
    }`">
    <div>{{ gameWin ? "You win!" : "Game over!" }}</div>
    <div v-if="gameWin" class="button mt-20px text-xl" @click="gameWin = false">Keep going</div>
    <div class="button mt-20px text-xl" @click="reset">Try again</div>
  </div>
</template>

<script setup lang="ts">
import { reset, gameOver, gameWin } from "@/hooks/logic";

defineOptions({
  name: "Overlay",
});
</script>

<style scoped></style>
