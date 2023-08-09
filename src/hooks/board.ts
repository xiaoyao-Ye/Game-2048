import { Tile } from "@/types";

// 生成方块
const generateTile = (value?: number, merged = false): Tile => {
  if (typeof value !== "number") value = Math.random() < 0.9 ? 2 : 4;
  return { value, merged };
};

// 生成地图
const generateBoard = (size: number): Tile[][] => {
  const board: Tile[][] = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = generateTile(0);
    }
  }
  return board;
};

// 获取所有空格子
const getEmptyCells = (board: Tile[][]) => {
  const emptyTiles: { x: number; y: number }[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      // 如果当前格子为空
      if (board[i][j].value === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }
  return emptyTiles;
};

// 获取随机空格子
const getRandomEmptyCell = (emptyTiles: { x: number; y: number }[]) => {
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomIndex];
};

// 给地图的随机空格子添加方块
const addTile = (board: Tile[][], tile: Tile) => {
  const emptyTiles = getEmptyCells(board);
  if (emptyTiles.length > 0) {
    const { x, y } = getRandomEmptyCell(emptyTiles);
    board[x][y] = tile;
  }
};

export { generateBoard, generateTile, addTile };
