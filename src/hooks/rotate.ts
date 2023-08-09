import { Direction, Tile } from "@/types";

// 旋转board
const rotate = (board: unknown[][], direction: Direction) => {
  if (direction === "ArrowUp") return board;
  if (direction === "ArrowDown") return board.reverse();
  if (direction === "ArrowLeft") {
    // 顺时针旋转90度
    board.reverse();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < i; j++) {
        [board[i][j], board[j][i]] = [board[j][i], board[i][j]];
      }
    }
  }
  if (direction === "ArrowRight") {
    // 逆时针旋转90度
    // for (let i = 0; i < board.length; i++) {
    //   for (let j = 0; j < i; j++) {
    //     [board[i][j], board[j][i]] = [board[j][i], board[i][j]];
    //   }
    // }
  }
};

const rotatingBack = (board: Tile[][], direction: Direction) => {
  if (direction === "ArrowUp") return board;
};

export { rotate, rotatingBack };
