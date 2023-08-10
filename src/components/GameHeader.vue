<template>
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
        <div class="button mr-5px" :class="canUndo ? 'hover:bg-#8F7A66DD' : 'op-50 cursor-no-drop'" @click="undo">Undo</div>
        <div class="button" @click="reset">New Game</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { score, bestScore, reset } from "@/hooks/logic";
import { canUndo, undo } from "@/hooks/state";

defineOptions({
  name: "GameHeader",
});
</script>

<style scoped></style>
@/hooks/state
