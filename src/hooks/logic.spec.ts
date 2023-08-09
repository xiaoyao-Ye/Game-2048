import { it, expect, describe } from "vitest";
import { generateBoard } from "./board";
import { isChanged, moveUp, isOver, isWin } from "./logic";

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

  it("is changed", () => {
    const board = generateBoard(4);
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[1][0].value = 2;

    const notChanged = isChanged(board, board);
    const changed = isChanged(board, boardCopy);

    expect(notChanged).toBe(false);
    expect(changed).toBe(true);
  });

  it("game over", () => {
    const board = generateBoard(4);
    board[0][0].value = 2;
    board[0][1].value = 4;
    board[0][2].value = 2;
    board[0][3].value = 4;
    board[1][0].value = 4;
    board[1][1].value = 2;
    board[1][2].value = 4;
    board[1][3].value = 2;
    board[2][0].value = 2;
    board[2][1].value = 4;
    board[2][2].value = 2;
    board[2][3].value = 4;
    board[3][0].value = 4;
    board[3][1].value = 2;
    board[3][2].value = 4;
    board[3][3].value = 2;

    moveUp(board);

    expect(isOver(board)).toBe(true);
  });

  it("game win", () => {
    expect(isWin(1024)).toBe(false);
    expect(isWin(2048)).toBe(true);
  });
});
