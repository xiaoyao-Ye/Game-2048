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
