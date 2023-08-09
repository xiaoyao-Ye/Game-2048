import { Tile } from "@/types";

// 这里是游戏状态部分hook
const isWin = (value: number) => {
  return value >= 2048;
};

const isOver = (board: Tile[][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].value === 0) return false;

      if (row > 0 && board[row][col].value === board[row - 1][col].value) return false;

      if (col > 0 && board[row][col].value === board[row][col - 1].value) return false;
    }
  }
  return true;
};

export { isWin, isOver };
