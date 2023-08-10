import { Tile } from "@/types";
import { computed, ref } from "vue";
import { gameOver, score, board } from "./logic";
import { getBoardValue, setBoardValue } from "./tool";

// undo
const undoLen = 5;
const history = ref<{ boardValues: number[][]; score: number }[]>([]);
const canUndo = computed(() => Boolean(history.value.length) && !gameOver.value);

const saveHistory = (board: Tile[][], score: number) => {
  const boardValues = getBoardValue(board);
  history.value.push({ boardValues, score });
  if (history.value.length > undoLen) history.value.shift();
};

const undo = () => {
  if (!canUndo.value) return;
  const { boardValues, score: HistoricalScore } = history.value.pop()!;
  setBoardValue(board.value, boardValues);
  score.value = HistoricalScore;
};

// 2048 is the win condition
const isWin = (value: number) => {
  return value >= 2048;
};

// 判断是否没有操作空间
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

export { history, canUndo, saveHistory, undo, isWin, isOver };
