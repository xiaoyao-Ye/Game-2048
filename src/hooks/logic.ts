import { Direction, Tile } from "@/types";
import { ref } from "vue";
import { rotate, rotateReverse } from "./rotate";
import { addTile, generateTile } from "./board";
import { isOver, isWin } from "./state";

const score = ref(0);
const bestScore = ref(0);
// 能否放到state里面?
const gameOver = ref(false);
const gameWin = ref(false);
// 能否放到board里面?
const board = ref<Tile[][]>([]);
const boardSize = ref(4);

// 向上移动
const moveUp = (board: Tile[][]) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // 标记格子未合并过
      board[i][j].merged = false;
      // 如果格子为空, 则跳过
      if (board[i][j].value === 0) continue;
      // 如果格子不为空, 则向上移动格子, 直到遇到边界或非空格子
      let k = i;
      while (k > 0 && board[k - 1][j].value === 0) {
        board[k - 1][j].value = board[k][j].value;
        board[k][j].value = 0;
        k--;
      }
      if (k <= 0) continue;
      // 如果上方格子与当前格子的值相等, 则合并它们
      const target = board[k - 1][j];
      const current = board[k][j];
      if (!target.merged && target.value === current.value) {
        target.value *= 2;
        target.merged = true;
        current.value = 0;
        // 记录分数
        score.value += target.value;
        // 判断是否胜利
        gameWin.value = isWin(target.value);
      }
    }
  }
};

// 判断是否进行过有效操作
const isChanged = (board: Tile[][], boardCopy: Tile[][]) => {
  return boardCopy.some((row, i) => row.some((tile, j) => tile.value !== board[i][j].value));
};

// 移动操作
const moveHandle = (direction: Direction) => {
  // 下面这行放在键盘事件和触摸事件里面会更好一些, 但是需要在多个函数编写相同的代码, 所以就暂时放在这里了, 后面再优化
  if (gameOver.value) return;
  // saveHistory();
  // 深拷贝 board
  let boardCopy: Tile[][] = JSON.parse(JSON.stringify(board.value));
  // 旋转 board 为向上移动
  rotate(boardCopy, direction);
  // 向上移动
  moveUp(boardCopy);
  // 旋转 board 为原来的方向
  rotateReverse(boardCopy, direction);
  // 用于判断是否进行过有效操作
  let changed = isChanged(board.value, boardCopy);
  if (changed) {
    board.value = boardCopy;
    // 如果进行过有效操作随机创建一个新的块
    addTile(board.value, generateTile());
    // 如果棋盘大小大于等于 6, 则再创建一个新的块
    if (boardSize.value >= 6) addTile(board.value, generateTile());
    // 记录最高分
    if (bestScore.value < score.value) bestScore.value = score.value;
    // 判断游戏是否结束
    gameOver.value = isOver(board.value);
    // } else {
    //   history.value.pop();
  }
};

export { board, boardSize, score, bestScore, gameOver, gameWin, moveHandle, moveUp, isChanged };
