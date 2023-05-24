import { ref } from "vue";

class Tile {
  value: number = 0;
  merged: boolean = false;
  constructor(value: number = 0) {
    this.value = value;
  }
}

const MAP_SIZE = 4;

const board = ref<Tile[][]>([]);

const score = ref(0);

const reset = () => {
  score.value = 0;
  // Clear the board
  for (let i = 0; i < MAP_SIZE; i++) {
    for (let j = 0; j < MAP_SIZE; j++) {
      if (!board.value[i]) board.value[i] = [];
      board.value[i][j] = new Tile();
    }
  }

  // Add two(根据MAP_SIZE控制初始tile个数) new tiles
  // for (let i = 0; i < Math.floor(MAP_SIZE / 2); i++) {
  //   let x = Math.floor(Math.random() * MAP_SIZE);
  //   let y = Math.floor(Math.random() * MAP_SIZE);
  //   board.value[x][y] = createTile(0);
  // }
  // addTile(createTile());
  // addTile(createTile());
};

const createTile = (value?: number) => {
  return new Tile(value ?? (Math.random() < 0.9 ? 2 : 4));
};

const getEmptyCells = () => {
  const emptyTiles: { x: number; y: number }[] = [];
  for (let i = 0; i < MAP_SIZE; i++) {
    for (let j = 0; j < MAP_SIZE; j++) {
      if (board.value[i][j].value === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }
  return emptyTiles;
};

const addTile = (cell: Tile) => {
  const emptyTiles = getEmptyCells();
  if (emptyTiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const { x, y } = emptyTiles[randomIndex];
    board.value[x][y] = cell;
  }
};

type Direction = "up" | "down" | "left" | "right";

const move = (direction: Direction) => {
  let moved = false;

  switch (direction) {
    case "up":
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
          if (board.value[i][j].value === 0) continue;
          board.value[i][j].merged = false;
          // 如果当前格子不为空
          let k = i;
          // 向上移动格子，直到遇到边界或非空格子
          while (k > 0 && board.value[k - 1][j].value === 0) {
            board.value[k - 1][j].value = board.value[k][j].value;
            board.value[k][j].value = 0;
            moved = true;
            k--;
          }
          // 如果上方格子与当前格子的值相等，则合并它们
          if (k > 0 && !board.value[k - 1][j].merged && board.value[k - 1][j].value === board.value[k][j].value) {
            board.value[k - 1][j].value *= 2;
            board.value[k - 1][j].merged = true;
            board.value[k][j].value = 0;
            moved = true;
            score.value += board.value[k - 1][j].value;
          }
        }
      }
      break;
    case "down":
      for (let j = 0; j < 4; j++) {
        for (let i = 3; i >= 0; i--) {
          if (board.value[i][j].value === 0) continue;
          board.value[i][j].merged = false;
          let k = i;
          while (k < 3 && board.value[k + 1][j].value === 0) {
            board.value[k + 1][j].value = board.value[k][j].value;
            board.value[k][j].value = 0;
            moved = true;
            k++;
          }
          if (k < 3 && !board.value[k + 1][j].merged && board.value[k + 1][j].value === board.value[k][j].value) {
            board.value[k + 1][j].value *= 2;
            board.value[k + 1][j].merged = true;
            board.value[k][j].value = 0;
            moved = true;
            score.value += board.value[k + 1][j].value;
          }
        }
      }
      break;
    case "left":
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (board.value[i][j].value === 0) continue;
          board.value[i][j].merged = false;
          let k = j;
          // 目标为0
          while (k > 0 && board.value[i][k - 1].value === 0) {
            board.value[i][k - 1].value = board.value[i][k].value;
            board.value[i][k].value = 0;
            moved = true;
            k--;
          }
          // 目标可合并
          if (k > 0 && !board.value[i][k - 1].merged && board.value[i][k - 1].value === board.value[i][k].value) {
            board.value[i][k - 1].value *= 2;
            board.value[i][k - 1].merged = true;
            board.value[i][k].value = 0;
            moved = true;
            score.value += board.value[i][k - 1].value;
          }
        }
      }
      break;
    case "right":
      for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
          if (board.value[i][j].value === 0) continue;
          board.value[i][j].merged = false;
          let k = j;
          while (k < 3 && board.value[i][k + 1].value === 0) {
            board.value[i][k + 1].value = board.value[i][k].value;
            board.value[i][k].value = 0;
            moved = true;
            k++;
          }
          if (k < 3 && !board.value[i][k + 1].merged && board.value[i][k + 1].value === board.value[i][k].value) {
            board.value[i][k + 1].value *= 2;
            board.value[i][k + 1].merged = true;
            board.value[i][k].value = 0;
            moved = true;
            score.value += board.value[i][k + 1].value;
          }
        }
      }
      break;
  }

  return moved;
};

const keydownHandle = (event: KeyboardEvent) => {
  let moved = false;
  switch (event.key) {
    case "ArrowUp":
      moved = move("up");
      break;
    case "ArrowDown":
      moved = move("down");
      break;
    case "ArrowLeft":
      moved = move("left");
      break;
    case "ArrowRight":
      moved = move("right");
      break;
  }
  // 如果进行过有效操作随机创建一个新的块
  if (moved) {
    addTile(createTile());
  }
};

export { MAP_SIZE, board, score, Tile, reset, createTile, addTile, move, keydownHandle };
