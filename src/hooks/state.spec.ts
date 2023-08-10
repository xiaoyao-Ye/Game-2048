import { it, expect, describe } from "vitest";
import { history, isOver, isWin, saveHistory, undo } from "./state";
import { generateBoard } from "./board";
import { board, score } from "./logic";

describe("undo", () => {
  it("should save history", () => {
    const board = generateBoard(4);
    board[0][0].value = 4;
    board[2][0].value = 4;

    saveHistory(board, 8);

    expect(history.value).toEqual([
      {
        boardValues: [
          [4, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        score: 8,
      },
    ]);
  });

  it("The maximum history length is 5", () => {
    const board = generateBoard(4);
    history.value = [];

    saveHistory(board, 8);
    saveHistory(board, 8);
    saveHistory(board, 8);
    saveHistory(board, 8);
    saveHistory(board, 8);
    saveHistory(board, 8);

    expect(history.value.length).toBe(5);
  });

  it("should undo", () => {
    board.value = generateBoard(4);
    history.value = [
      {
        boardValues: [
          [4, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        score: 8,
      },
    ];

    undo();

    expect(score.value).toBe(8);
    expect(board.value[0][0].value).toBe(4);
    expect(board.value[2][0].value).toBe(4);
  });
});

describe("game state", () => {
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

    expect(isOver(board)).toBe(true);
  });

  it("game not over", () => {
    const board = generateBoard(4);
    board[0][0].value = 4;
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

    expect(isOver(board)).toBe(false);
  });

  it("game win", () => {
    expect(isWin(1024)).toBe(false);
    expect(isWin(2048)).toBe(true);
  });
});
