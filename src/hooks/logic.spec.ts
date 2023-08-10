import { it, expect, describe, beforeEach } from "vitest";
import { generateBoard } from "./board";
import { bestScore, board, gameOver, isChanged, moveHandle, moveUp, reset, score } from "./logic";
import { Tile } from "@/types";

describe("move", () => {
  it("should move up", () => {
    const board = generateBoard(4);
    board[1][0].value = 2;
    board[2][1].value = 4;

    moveUp(board);

    expect(board[0][0].value).toBe(2);
    expect(board[0][1].value).toBe(4);
  });

  it("should merge", () => {
    const board = generateBoard(4);
    board[0][0].value = 2;
    board[2][0].value = 2;

    moveUp(board);

    expect(board[0][0].value).toBe(4);
    expect(board[2][0].value).toBe(0);
  });

  it("should merge", () => {
    const board = generateBoard(4);
    board[0][0].value = 2;
    board[1][0].value = 2;
    board[2][0].value = 2;
    board[3][0].value = 2;

    moveUp(board);

    expect(board[0][0].value).toBe(4);
    expect(board[1][0].value).toBe(4);
    expect(board[2][0].value).toBe(0);
    expect(board[3][0].value).toBe(0);
  });

  it("should merge", () => {
    const board = generateBoard(4);
    board[0][0].value = 2;
    board[1][0].value = 2;
    board[2][0].value = 4;
    board[3][0].value = 8;

    moveUp(board);

    expect(board[0][0].value).toBe(4);
    expect(board[1][0].value).toBe(4);
    expect(board[2][0].value).toBe(8);
    expect(board[3][0].value).toBe(0);
  });

  it("board is changed", () => {
    const board = generateBoard(4);
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[1][0].value = 2;

    const notChanged = isChanged(board, board);
    const changed = isChanged(board, boardCopy);

    expect(notChanged).toBe(false);
    expect(changed).toBe(true);
  });
});

describe("moveHandle", () => {
  beforeEach(() => {
    reset();
  });

  it("should not move if game is over", () => {
    gameOver.value = true;
    const originalBoard: Tile[][] = JSON.parse(JSON.stringify(board.value));

    moveHandle("ArrowUp");

    expect(board.value).toEqual(originalBoard);
  });

  it("should move tiles up and merge them if possible", () => {
    board.value = generateBoard(4);
    board.value[0][0].value = 2;
    board.value[1][0].value = 2;
    const originalBoard: Tile[][] = JSON.parse(JSON.stringify(board.value));

    moveHandle("ArrowUp");

    expect(board.value[0][0].value).toBe(4);
    expect(score.value).toBe(4);
    expect(bestScore.value).toBe(4);
    expect(gameOver.value).toBe(false);
    expect(isChanged(originalBoard, board.value)).toBe(true);
    // 添加了一个新的 tile
    expect(board.value.flat().filter(tile => tile.value !== 0).length).toBe(2);
  });
});
