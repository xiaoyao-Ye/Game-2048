import { Direction, Tile } from "@/types";

// 旋转board
const rotate = (board: unknown[][], direction: Direction) => {
  if (direction === "ArrowUp") return;
  if (direction === "ArrowDown") {
    board.reverse();
    return;
  }

  if (direction === "ArrowLeft") board.reverse();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < i; j++) {
      if (direction === "ArrowRight") {
        [board[j][i], board[i][j]] = [board[i][j], board[j][i]];
      }
      if (direction === "ArrowLeft") {
        [board[i][j], board[j][i]] = [board[j][i], board[i][j]];
      }
    }
  }
  if (direction === "ArrowRight") board.reverse();
};

// 旋转board的逆操作
const rotateReverse = (board: unknown[][], direction: Direction) => {
  if (direction === "ArrowLeft" || direction === "ArrowRight") {
    rotate(board, direction === "ArrowLeft" ? "ArrowRight" : "ArrowLeft");
  } else {
    rotate(board, direction);
  }
};

// set board value
const setBoardValue = (board: Tile[][], values: number[][]) => {
  board.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      cell.value = values[rowIdx][colIdx];
    });
  });
};

// get board value
const getBoardValue = (board: Tile[][]): number[][] => {
  return board.map(row => row.map(cell => cell.value));
};

export { rotate, rotateReverse, setBoardValue, getBoardValue };
