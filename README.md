# Vue 3 + TypeScript + Vite

## 使用 vue+typescript 编写一个 2048 游戏, 包含该游戏的所有逻辑操作, 输出到一个 vue 文件

以下是一个简单的 Vue + TypeScript 2048 游戏的示例代码。该代码包含了游戏逻辑和界面的实现。你可以将其复制到一个 Vue 单文件组件中，然后在浏览器中运行。

```vue
<template>
  <div class="game">
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell" :class="'cell-' + cell">
          {{ cell || "" }}
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

const BOARD_SIZE = 4;

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

interface Cell {
  value: number;
  merged: boolean;
}

export default defineComponent({
  name: "Game",
  setup() {
    const board = ref<Cell[][]>([]);
    const score = ref(0);

    const reset = () => {
      board.value = Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => ({ value: 0, merged: false })),
      );
      score.value = 0;
      addRandomTile();
      addRandomTile();
    };

    const addRandomTile = () => {
      const emptyCells = getEmptyCells();
      if (emptyCells.length === 0) {
        return;
      }
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board.value[row][col].value = Math.random() < 0.9 ? 2 : 4;
    };

    const getEmptyCells = () => {
      const emptyCells: { row: number; col: number }[] = [];
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (board.value[row][col].value === 0) {
            emptyCells.push({ row, col });
          }
        }
      }
      return emptyCells;
    };

    const move = (direction: Direction) => {
      let moved = false;
      for (let i = 0; i < BOARD_SIZE; i++) {
        const row = direction === Direction.Up ? i : direction === Direction.Down ? BOARD_SIZE - 1 - i : 0;
        const col = direction === Direction.Left ? i : direction === Direction.Right ? BOARD_SIZE - 1 - i : 0;
        const cell = board.value[row][col];
        if (cell.value === 0) {
          continue;
        }
        let newRow = row;
        let newCol = col;
        while (true) {
          if (direction === Direction.Up) {
            newRow--;
          } else if (direction === Direction.Down) {
            newRow++;
          } else if (direction === Direction.Left) {
            newCol--;
          } else if (direction === Direction.Right) {
            newCol++;
          }
          if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE) {
            newRow -= direction === Direction.Up ? -1 : direction === Direction.Down ? 1 : 0;
            newCol -= direction === Direction.Left ? -1 : direction === Direction.Right ? 1 : 0;
            break;
          }
          const newCell = board.value[newRow][newCol];
          if (newCell.value === 0) {
            cell.merged = false;
            newCell.value = cell.value;
            cell.value = 0;
            row = newRow;
            col = newCol;
            moved = true;
          } else if (newCell.value === cell.value && !newCell.merged && !cell.merged) {
            newCell.value *= 2;
            newCell.merged = true;
            cell.value = 0;
            score.value += newCell.value;
            moved = true;
            break;
          } else {
            newRow -= direction === Direction.Up ? -1 : direction === Direction.Down ? 1 : 0;
            newCol -= direction === Direction.Left ? -1 : direction === Direction.Right ? 1 : 0;
            break;
          }
        }
      }
      if (moved) {
        addRandomTile();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          move(Direction.Up);
          break;
        case "ArrowDown":
          move(Direction.Down);
          break;
        case "ArrowLeft":
          move(Direction.Left);
          break;
        case "ArrowRight":
          move(Direction.Right);
          break;
      }
    };

    watch(
      board,
      () => {
        const flattened = board.value.flat();
        if (flattened.some(cell => cell.value === 2048)) {
          alert("You win!");
        }
        if (
          getEmptyCells().length === 0 &&
          !flattened.some((cell, index) => {
            const row = Math.floor(index / BOARD_SIZE);
            const col = index % BOARD_SIZE;
            return (
              (row > 0 && board.value[row - 1][col].value === cell.value) ||
              (row < BOARD_SIZE - 1 && board.value[row + 1][col].value === cell.value) ||
              (col > 0 && board.value[row][col - 1].value === cell.value) ||
              (col < BOARD_SIZE - 1 && board.value[row][col + 1].value === cell.value)
            );
          })
        ) {
          alert("Game over!");
        }
      },
      { deep: true },
    );

    reset();
    window.addEventListener("keydown", handleKeyDown);

    return {
      board,
      score,
      reset,
    };
  },
});
</script>

<style>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
  padding: 8px;
  background-color: #bbada0;
  border-radius: 8px;
}

.row {
  display: flex;
  flex-direction: row;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
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
```

## How can I add animations to the 2048 game?

To add animations to the 2048 game, you can use CSS transitions or animations. You can add classes to the elements that you want to animate and define the animation properties in your CSS file. Here's an example of how you can add a fade-in animation to the tiles:

```css
.tile {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.tile.show {
  opacity: 1;
}
```

In this example, the .tile class has an opacity of 0 and a transition property that specifies the duration, timing function, and delay of the transition. When the .show class is added to the element, the opacity is changed to 1, triggering the transition.

You can add the .show class to the tiles when they are created or moved using JavaScript. For example, you can add the following code to the addRandomTile function to add the .show class to the new tile:

```js
const tile = board.value[row][col];
tile.value = Math.random() < 0.9 ? 2 : 4;
tile.merged = false;
tile.show = true; // add the .show class to the tile
```

You can also add animations to other elements, such as the score or the game board itself, using similar techniques.

## How can I make the game responsive for different screen sizes?

To make the game responsive for different screen sizes, you can use CSS media queries to adjust the layout and font sizes based on the screen width. Here's an example of how you can modify the existing CSS to make the game responsive:

```css
@media screen and (max-width: 600px) {
  .board {
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding: 4px;
  }

  .cell {
    font-size: 16px;
  }
}

@media screen and (min-width: 601px) and (max-width: 900px) {
  .board {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 6px;
  }

  .cell {
    font-size: 20px;
  }
}

@media screen and (min-width: 901px) {
  .board {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding: 8px;
  }

  .cell {
    font-size: 24px;
  }
}
```

In this example, we define three media queries for different screen widths. Each media query adjusts the grid layout and font size of the cells based on the screen width. You can modify the values to suit your needs.

You can also use JavaScript to adjust the layout and font sizes dynamically based on the screen size. For example, you can add an event listener to the window object to detect changes in the screen size and adjust the layout accordingly:

```js
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  // adjust the layout and font size based on the screen width
});
```

However, using CSS media queries is generally simpler and more efficient than using JavaScript for responsive design.

## How can I add touch support to the game?

To add touch support to the game, you can use the touchstart, touchmove, and touchend events to detect touch gestures and translate them into game actions. Here's an example of how you can modify the existing code to add touch support:

```js
// add touch event listeners to the game board
const board = document.querySelector(".board");
let touchStartX, touchStartY;

board.addEventListener("touchstart", event => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

board.addEventListener("touchmove", event => {
  event.preventDefault();
});

board.addEventListener("touchend", event => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (Math.max(absDx, absDy) > 10) {
    if (absDx > absDy) {
      if (dx > 0) {
        game.moveRight();
      } else {
        game.moveLeft();
      }
    } else {
      if (dy > 0) {
        game.moveDown();
      } else {
        game.moveUp();
      }
    }
  }
});
```

In this example, we add touch event listeners to the game board and use them to detect swipe gestures. When the touchstart event is fired, we record the starting position of the touch. When the touchmove event is fired, we prevent the default behavior to prevent scrolling. When the touchend event is fired, we calculate the distance and direction of the swipe and translate it into a game action.

You can modify the game.moveLeft(), game.moveRight(), game.moveUp(), and game.moveDown() functions to handle the game actions. For example, you can add the following code to the game.moveLeft() function to move the tiles to the left:

```js
for (let row = 0; row < this.size; row++) {
  for (let col = 1; col < this.size; col++) {
    const tile = this.board[row][col];
    if (tile) {
      let targetCol = col;
      while (targetCol > 0) {
        const target = this.board[row][targetCol - 1];
        if (!target) {
          targetCol--;
        } else if (target.value === tile.value && !target.merged) {
          this.mergeTiles(tile, target);
          break;
        } else {
          break;
        }
      }
      if (col !== targetCol) {
        this.moveTile(tile, row, targetCol);
      }
    }
  }
}
```

You can also modify the CSS to add touch feedback, such as highlighting the touched tile. For example, you can add the following code to the .cell class to change the background color of the touched tile:

```css
.cell:active {
  background-color: #eee;
}
```

In this example, the :active pseudo-class is used to apply the style when the tile is being touched.

## chatbot.theb.ai

> 让 `chatbot.theb.ai` 充当结对编程助手兼产品经理根据研发步骤写出来的需求文档

1. 概述

   本项目是一个基于 Vue3 + TypeScript + Unocss 的全平台适配 2048 游戏。游戏需要满足常规 2048 游戏的玩法规则，同时需要支持不同屏幕大小和设备类型的适配。

2. 玩法规则

   玩家通过点击屏幕上的方向键进行操作，将相同数字的方块合并成更大的方块，最终拼凑出 2048 的方块即为胜利。

   具体的玩法规则如下：

   - 初始时屏幕上会有两个数字为 2 的方块。
   - 按下方向键后，所有方块会朝着该方向移动，直到遇到另一个方块或到达屏幕边缘。
   - 相邻且数字相同的方块会合并成一个数字两倍的方块，合并后生成的方块所在位置上的得分为该方块的数字。
   - 每次操作后，在空白区域随机生成一个数字为 2 或 4 的方块。
   - 当屏幕上存在数字为 2048 的方块时，玩家获胜；当无法再进行有效操作时，游戏结束。

3. 界面设计

   游戏主要分为两个部分：

   - 游戏区域：显示方块和得分等信息。
   - 控制区域：包括上下左右四个方向键，用于控制方块移动。

     3.1 游戏区域

   - 游戏区域由一个 4×4 的方格组成，每个方格内可以放置一个方块。初始时屏幕上会有两个数字为 2 的方块。
   - 在游戏过程中，方块会朝着玩家点击的方向移动，并在相邻且数字相同的方块合并生成新的方块。移动后的方块位置及数字会在游戏区域中实时更新。
   - 当游戏结束时，屏幕上会弹出得分统计以及重新开始和返回主界面的按钮。

     3.2 控制区域

   - 控制区域包括上下左右四个方向键，用于控制方块移动。玩家需要点击方向键来指定方向，游戏才能进行。

4. 技术实现

   本项目使用 Vue3 框架搭建前端界面，采用 TypeScript 进行代码编写和类型检查，使用 Unocss 实现全平台适配样式。

   具体的开发步骤如下：

   - 初始化 Vue3 项目，引入 Unocss 库；
   - 设计游戏组件结构和状态管理；
   - 实现游戏区域和控制区域的界面布局；
   - 实现方块移动逻辑和得分统计逻辑；
   - 设计游戏结束弹窗并实现重新开始和返回主界面的功能；
   - 进行全平台适配。

   以上是开发步骤的大致流程，如果你需要添加其他功能或有任何问题，请随时告诉我。

## TODO

- [ ] 使用 unocss 改写样式, 完成响应式
- [ ] 移动动画合并动画
- [ ] win or over
- [ ] Bigger Board
- [ ] Optimize code
