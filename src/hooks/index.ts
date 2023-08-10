import { onMounted, onUnmounted } from "vue";
import { Direction } from "@/types";
import { moveHandle, reset } from "./logic";

// 监听触摸事件
let startX = 0;
let startY = 0;
const touchStartHandle = (event: TouchEvent) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
};

const touchEndHandle = (event: TouchEvent) => {
  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;
  const diffX = endX - startX;
  const diffY = endY - startY;

  if (Math.abs(diffX) < 50 && Math.abs(diffY) < 50) return;

  let direction: Direction;
  if (Math.abs(diffX) > Math.abs(diffY)) {
    direction = diffX > 0 ? "ArrowRight" : "ArrowLeft";
  } else {
    direction = diffY > 0 ? "ArrowDown" : "ArrowUp";
  }
  moveHandle(direction);
};

// 监听键盘事件
const keydownHandle = (event: KeyboardEvent) => {
  moveHandle(event.key as Direction);
};

// 阻止触摸事件的默认行为
const preventTouchMove = (e: TouchEvent) => {
  e.preventDefault();
};

const useGame = () => {
  onMounted(() => {
    window.addEventListener("keydown", keydownHandle);
    window.addEventListener("touchstart", touchStartHandle);
    window.addEventListener("touchend", touchEndHandle);
    window.addEventListener("touchmove", preventTouchMove, { passive: false });

    reset();
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", keydownHandle);
    window.removeEventListener("touchstart", touchStartHandle);
    window.removeEventListener("touchend", touchEndHandle);
    window.removeEventListener("touchmove", preventTouchMove);
  });
};

export { useGame };
