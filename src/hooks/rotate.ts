import { Direction } from "@/types";

// 旋转board
const rotate = (board: unknown[][], direction: Direction) => {
  if (direction === "ArrowUp") return;
  if (direction === "ArrowDown") return board.reverse();

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
  if (direction === "ArrowLeft") rotate(board, "ArrowRight");
  else if (direction === "ArrowRight") rotate(board, "ArrowLeft");
  else rotate(board, direction);
};

export { rotate, rotateReverse };
