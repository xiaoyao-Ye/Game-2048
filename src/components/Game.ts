import { computed, ref } from "vue";

class Tile {
  value: number = 0;
  merged: boolean = false;
  id: number = new Date().getTime();
  y: number = 0;
  [prop: string]: any;
  constructor(value: number = 0) {
    this.value = value;
  }
}

const MAP_SIZE = ref(4);

const board = ref<Tile[][]>([]);

const score = ref(0);

const bestScore = ref(0);

const gameOver = ref(false);

const win = ref(false);

// ============================== 创建游戏 ==============================

const setBoardSize = (size: number) => {
  MAP_SIZE.value = size;
};

const reset = () => {
  board.value.length = 0;
  score.value = 0;
  gameOver.value = false;
  win.value = false;
  history.value.length = 0;
  // Clear the board
  for (let i = 0; i < MAP_SIZE.value; i++) {
    for (let j = 0; j < MAP_SIZE.value; j++) {
      if (!board.value[i]) board.value[i] = [];
      board.value[i][j] = new Tile();
    }
  }
};

const createTile = (value?: number) => {
  return new Tile(value ?? (Math.random() < 0.9 ? 2 : 4));
};

const setBoard = (map: number[][]) => {
  map.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      board.value[rowIdx][colIdx].value = cell;
    });
  });
};

const getBoard = (): number[][] => {
  return board.value.map(row => {
    return row.map(cell => cell.value);
  });
};

// ============================== undo ==============================

const undoLen = 5;
const history = ref<{ board: number[][]; score: number }[]>([]);
const canUndo = computed(() => Boolean(history.value.length) && !gameOver.value);
const saveHistory = () => {
  const map = getBoard();
  history.value.push({ board: map, score: score.value });
  if (history.value.length > undoLen) history.value.shift();
};
const onUndo = () => {
  if (!canUndo.value) return;
  const { board, score: HistoricalScore } = history.value.pop()!;
  setBoard(board);
  score.value = HistoricalScore;
};

// ============================== 添加随机瓷砖 ==============================

const getEmptyCells = () => {
  const emptyTiles: { x: number; y: number }[] = [];
  for (let i = 0; i < MAP_SIZE.value; i++) {
    for (let j = 0; j < MAP_SIZE.value; j++) {
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

// ============================== 移动逻辑 ==============================

type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

const move = (direction: Direction) => {
  let moved = false;

  switch (direction) {
    case "ArrowUp":
      for (let j = 0; j < MAP_SIZE.value; j++) {
        for (let i = 0; i < MAP_SIZE.value; i++) {
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
            isWin(board.value[k - 1][j].value);
          }
        }
      }
      break;
    case "ArrowDown":
      for (let j = 0; j < MAP_SIZE.value; j++) {
        for (let i = MAP_SIZE.value - 1; i >= 0; i--) {
          if (board.value[i][j].value === 0) continue;
          board.value[i][j].merged = false;
          let k = i;
          while (k < MAP_SIZE.value - 1 && board.value[k + 1][j].value === 0) {
            board.value[k + 1][j].value = board.value[k][j].value;
            board.value[k][j].value = 0;
            moved = true;
            k++;
          }
          if (
            k < MAP_SIZE.value - 1 &&
            !board.value[k + 1][j].merged &&
            board.value[k + 1][j].value === board.value[k][j].value
          ) {
            board.value[k + 1][j].value *= 2;
            board.value[k + 1][j].merged = true;
            board.value[k][j].value = 0;
            moved = true;
            score.value += board.value[k + 1][j].value;
            isWin(board.value[k + 1][j].value);
          }
        }
      }
      break;
    case "ArrowLeft":
      for (let i = 0; i < MAP_SIZE.value; i++) {
        for (let j = 0; j < MAP_SIZE.value; j++) {
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
            isWin(board.value[i][k - 1].value);
          }
        }
      }
      break;
    case "ArrowRight":
      for (let i = 0; i < MAP_SIZE.value; i++) {
        for (let j = MAP_SIZE.value - 1; j >= 0; j--) {
          if (board.value[i][j].value === 0) continue;
          board.value[i][j].merged = false;
          let k = j;
          while (k < MAP_SIZE.value - 1 && board.value[i][k + 1].value === 0) {
            board.value[i][k + 1].value = board.value[i][k].value;
            board.value[i][k].value = 0;
            moved = true;
            k++;
          }
          if (
            k < MAP_SIZE.value - 1 &&
            !board.value[i][k + 1].merged &&
            board.value[i][k + 1].value === board.value[i][k].value
          ) {
            board.value[i][k + 1].value *= 2;
            board.value[i][k + 1].merged = true;
            board.value[i][k].value = 0;
            moved = true;
            score.value += board.value[i][k + 1].value;
            isWin(board.value[i][k + 1].value);
          }
        }
      }
      break;
  }

  return moved;
};

// ============================== 游戏胜利 ==============================

const isWin = (value: number) => {
  if (value >= 2048) win.value = true;
};

// ============================== 游戏结束 ==============================

const isOver = (): boolean => {
  for (let row = 0; row < MAP_SIZE.value; row++) {
    for (let col = 0; col < MAP_SIZE.value; col++) {
      if (board.value[row][col].value === 0) {
        return false;
      }
      if (row > 0 && board.value[row][col].value === board.value[row - 1][col].value) {
        return false;
      }
      if (col > 0 && board.value[row][col].value === board.value[row][col - 1].value) {
        return false;
      }
    }
  }
  return true;
};

// ============================== 移动事件 ==============================

const moveHandle = (direction: Direction) => {
  saveHistory();
  let moved = move(direction);

  // 如果进行过有效操作随机创建一个新的块
  if (moved) {
    if (bestScore.value < score.value) bestScore.value = score.value;
    addTile(createTile());
    if (MAP_SIZE.value >= 6) addTile(createTile());
    gameOver.value = isOver();
  } else {
    history.value.pop();
  }
};

// ============================== 键盘事件 ==============================

const keydownHandle = (event: KeyboardEvent) => {
  if (gameOver.value) return;
  moveHandle(event.key as Direction);
};

// ============================== 触摸事件 ==============================

let startX = 0;
let startY = 0;
const touchStartHandle = (event: TouchEvent) => {
  if (gameOver.value) return;
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
};
const touchEndHandle = (event: TouchEvent) => {
  if (gameOver.value) return;
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

export {
  MAP_SIZE,
  board,
  gameOver,
  win,
  score,
  bestScore,
  canUndo,
  setBoardSize,
  onUndo,
  reset,
  createTile,
  addTile,
  move,
  keydownHandle,
  touchStartHandle,
  touchEndHandle,
  isOver,
  setBoard,
  getBoard,
};
