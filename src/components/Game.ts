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

const reset = () => {
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
  const transpose = (matrix: Tile[][]) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i; j < matrix[0].length; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
  };

  const reverseRows = (matrix: Tile[][]) => {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].reverse();
    }
  };

  const moveLeft = (matrix: Tile[][]) => {
    let moved = false;
    for (let i = 0; i < matrix.length; i++) {
      let k = 0;
      for (let j = 1; j < matrix[0].length; j++) {
        board.value[i][j].merged = false;
        if (matrix[i][j].value !== 0) {
          console.log(`当前位置${i}行${j}列`);
          console.log(`目标位置${i}行${k}列`);
          console.log("当前值", matrix[i][j].value);
          console.log("目标值", matrix[i][k].value);

          if (matrix[i][k].value === 0) {
            matrix[i][k].value = matrix[i][j].value;
            matrix[i][j].value = 0;
            moved = true;
          } else if (matrix[i][k].value === matrix[i][j].value && !matrix[i][k].merged && !matrix[i][j].merged) {
            matrix[i][k].value *= 2;
            matrix[i][j].value = 0;
            matrix[i][k].merged = true;
            moved = true;
          } else {
            k++;
            if (k !== j) {
              matrix[i][k].value = matrix[i][j].value;
              matrix[i][j].value = 0;
              moved = true;
            }
          }
        }
      }
    }
    if (moved) {
      addTile(createTile());
    }
  };

  const moveRight = (matrix: Tile[][]) => {
    reverseRows(matrix);
    moveLeft(matrix);
    reverseRows(matrix);
  };

  const moveUp = (matrix: Tile[][]) => {
    transpose(matrix);
    moveLeft(matrix);
    transpose(matrix);
  };

  const moveDown = (matrix: Tile[][]) => {
    transpose(matrix);
    moveRight(matrix);
    transpose(matrix);
  };

  switch (direction) {
    case "up":
      moveUp(board.value);
      break;
    case "down":
      moveDown(board.value);
      break;
    case "left":
      moveLeft(board.value);
      break;
    case "right":
      moveRight(board.value);
      break;
  }
};

const keydownHandle = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowUp":
      move("up");
      break;
    case "ArrowDown":
      move("down");
      break;
    case "ArrowLeft":
      move("left");
      break;
    case "ArrowRight":
      move("right");
      break;
  }
};

export { MAP_SIZE, board, Tile, reset, createTile, addTile, move, keydownHandle };
