<script setup lang="ts">
import Game from "./components/Game.vue";
</script>

<template>
  <Game />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  user-select: none;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #faf8ef;
}

div {
  box-sizing: border-box;
}
</style>
