<template>
  <div class="flex flex-col w-full mt-20px">
    <div class="text-xl fw-bold color-#776e65">Board size</div>
    <div class="flex-1 flex text-center">
      <div class="button flex-1 mr-10px" @click="onSetBoardSize(3)">3x3</div>
      <div class="button flex-1 mr-10px" @click="onSetBoardSize(4)">4x4</div>
      <div class="button flex-1 mr-10px" @click="onSetBoardSize(5)">5x5</div>
      <div class="button flex-1" @click="onSetBoardSize(6)">6x6</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onSetBoardSize } from "@/hooks/logic";

defineOptions({
  name: "BoardSizePicker",
});
</script>

<style scoped></style>
