<template>
  <div class="of-hidden px-20px flex items-center justify-center flex-col max-w-600px animate-fade-in">
    <div class="flex mb-20px">
      <div class="flex flex-1 flex-col justify-between mr-20px">
        <div class="text-5xl sm:text-6xl fw-bold color-#776e65">2048</div>
        <div class="color-#776e65">
          Join the numbers and get to the
          <span class="fw-bold">2048 tile!</span>
        </div>
      </div>
      <div class="flex flex-col items-end text-center fw-bold">
        <div class="flex">
          <div class="px-20px py-5px bg-#bbada0 rd-4px mr-5px">
            <div class="color-#eee4da">SCORE</div>
            <div class="color-#FFF text-xl">{{ score }}</div>
          </div>
          <div class="px-20px py-5px bg-#bbada0 rd-4px">
            <div class="color-#eee4da">BEST</div>
            <div class="color-#FFF text-xl">{{ bestScore }}</div>
          </div>
        </div>
        <div class="flex mt-10px">
          <div class="button mr-5px" :class="canUndo ? 'hover:bg-#8F7A66DD' : 'op-50 cursor-no-drop'" @click="onUndo">Undo</div>
          <div class="button" @click="onReset">New Game</div>
        </div>
      </div>
    </div>

    <div
      class="relative w-full grid grid-gap-8px p-8px rd-8px bg-#bbada0"
      :class="[`grid-cols-${MAP_SIZE}`, `grid-rows-${MAP_SIZE}`]">
      <div
        class="relative pt-100% h-0 text-32px fw-bold text-#776e65 bg-#cdc1b4 rd-8px"
        v-for="(cell, rowIndex) in board.flat()"
        :key="cell.id + rowIndex">
        <div
          class="absolute top-0 left-0 w-full h-full flex items-center justify-center rd-8px"
          :class="setBG(cell.value)"
          :style="cell.style">
          {{ cell.value || "" }}
        </div>
      </div>
      <div
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
      </div>
    </div>

    <div class="flex flex-col w-full mt-20px">
      <div class="text-xl fw-bold color-#776e65">Board size</div>
      <div class="flex-1 flex text-center">
        <div class="button flex-1 mr-10px" @click="onSetBoardSize(3)">3x3</div>
        <div class="button flex-1 mr-10px" @click="onSetBoardSize(4)">4x4</div>
        <div class="button flex-1 mr-10px" @click="onSetBoardSize(5)">5x5</div>
        <div class="button flex-1" @click="onSetBoardSize(6)">6x6</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import {
  MAP_SIZE,
  board,
  score,
  bestScore,
  canUndo,
  gameOver,
  win,
  reset,
  setBoardSize,
  onUndo,
  createTile,
  addTile,
  keydownHandle,
  touchStartHandle,
  touchEndHandle,
} from "./Game";

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

const onReset = () => {
  reset();
  addTile(createTile());
  addTile(createTile());
};

const onSetBoardSize = (size: number) => {
  setBoardSize(size);
  onReset();
};

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
