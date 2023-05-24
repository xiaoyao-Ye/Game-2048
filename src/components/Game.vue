<template>
  <div class="game">
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell" :class="'cell-' + cell.value">
          {{ cell.value || "" }}
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { board, reset, createTile, addTile, keydownHandle } from "./Game";
onMounted(() => {
  reset();
  addTile(createTile());
  addTile(createTile());

  window.addEventListener("keydown", keydownHandle);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownHandle);
});
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.board {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 400px;
  padding: 8px;
  background-color: #bbada0;
  border-radius: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  height: 95px;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  font-size: 32px;
  font-weight: bold;
  color: #776e65;
  background-color: #cdc1b4;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
}

.cell-0 {
  background-color: #ccc0b3;
}

.cell-2 {
  background-color: #eee4da;
}

.cell-4 {
  background-color: #ede0c8;
}

.cell-8 {
  background-color: #f2b179;
}

.cell-16 {
  background-color: #f59563;
}

.cell-32 {
  background-color: #f67c5f;
}

.cell-64 {
  background-color: #f65e3b;
}

.cell-128 {
  background-color: #edcf72;
}

.cell-256 {
  background-color: #edcc61;
}

.cell-512 {
  background-color: #edc850;
}

.cell-1024 {
  background-color: #edc53f;
}

.cell-2048 {
  background-color: #edc22e;
}
</style>
