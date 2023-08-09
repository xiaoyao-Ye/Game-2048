import { Direction, Tile } from "@/types";
import { ref } from "vue";
import { rotate, rotatingBack } from "./rotate";

// 这里是游戏逻辑部分hook(包括移动, 合并, 生成方块, 判断游戏是否结束等)
const board = ref<Tile[][]>([]);
const score = ref(0);
const bestScore = ref(0);
const gameOver = ref(false);
const win = ref(false);

// 移动操作
const move = (board: Tile[][]): Tile[][] => {
  return board;
};

const moveHandle = (direction: Direction) => {
  // 下面这行放在键盘事件和触摸事件里面会更好一些, 但是需要在多个函数编写相同的代码, 所以就暂时放在这里了, 后面再优化
  if (gameOver.value) return;
  // saveHistory();
  let moved = false;
  let boardCopy = JSON.parse(JSON.stringify(board));
  boardCopy = rotate(boardCopy, direction);
  boardCopy = move(boardCopy);
  boardCopy = rotatingBack(boardCopy, direction);
  console.log(moved, boardCopy);

  // 如果进行过有效操作随机创建一个新的块
  // if (moved) {
  //   if (bestScore.value < score.value) bestScore.value = score.value;
  //   addTile(createTile());
  //   if (MAP_SIZE.value >= 6) addTile(createTile());
  //   gameOver.value = isOver();
  // } else {
  //   history.value.pop();
  // }
};

export { board, score, bestScore, gameOver, win, moveHandle };
