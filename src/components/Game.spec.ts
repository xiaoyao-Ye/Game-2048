import { it, expect, describe, beforeEach } from "vitest";
import { createTile, addTile, reset, board, move, score, isOver, win, setBoard, getBoard } from "./Game";

describe("test create game", () => {
  beforeEach(() => {
    reset();
  });

  it("should create a tile with the given value", () => {
    const tile = createTile(0);
    const tile_2 = createTile(2);

    expect(tile.value).toBe(0);
    expect(tile_2.value).toBe(2);
  });

  it("should add a tile to the board", () => {
    const tile = createTile();
    addTile(tile);
    expect(board.value.flat().some(t => t.value === tile.value)).toBe(true);
  });

  it("should reset the board", () => {
    const tile = createTile(2);
    addTile(tile);
    score.value = 8;

    reset();

    expect(score.value).toBe(0);
    expect(board.value.flat().some(t => t === tile)).toBe(false);
    expect(board.value.flat().every(t => t.value === 0)).toBe(true);
  });
});

describe("test move", () => {
  beforeEach(() => {
    reset();
  });

  it("should move tiles ArrowUp : Easy", () => {
    const map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 2, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    move("ArrowUp");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should move tiles ArrowUp : Medium", () => {
    const map = [
      [0, 0, 0, 0],
      [4, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [4, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    move("ArrowUp");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should move tiles ArrowDown", () => {
    const map = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 0, 0],
    ];

    move("ArrowDown");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should move tiles ArrowLeft", () => {
    const map = [
      [0, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 0, 0],
    ];

    move("ArrowLeft");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should move tiles ArrowRight", () => {
    const map = [
      [0, 0, 2, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    move("ArrowRight");

    expect(getBoard()).toEqual(shouldMap);
  });
});

describe("merge", () => {
  beforeEach(() => {
    reset();
  });

  it("should merge tiles when moving ArrowUp", () => {
    const map = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    move("ArrowUp");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should merge tiles when moving ArrowDown", () => {
    const map = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 0, 0],
    ];

    move("ArrowDown");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should merge tiles when moving ArrowLeft", () => {
    const map = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    move("ArrowLeft");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should merge tiles when moving ArrowRight", () => {
    const map = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setBoard(map);
    const shouldMap = [
      [0, 0, 0, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    move("ArrowRight");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should merge tiles when moving ArrowLeft", () => {
    const map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
    ];
    setBoard(map);
    const shouldMap = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 4, 0, 0],
    ];

    move("ArrowLeft");

    expect(getBoard()).toEqual(shouldMap);
  });

  it("should merge tiles when moving ArrowLeft", () => {
    const map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 4, 8],
    ];
    setBoard(map);
    const shouldMap = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 4, 8, 0],
    ];

    move("ArrowLeft");

    expect(getBoard()).toEqual(shouldMap);

    move("ArrowLeft");

    const stepShouldMap = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [8, 8, 0, 0],
    ];

    expect(getBoard()).toEqual(stepShouldMap);
  });
});

describe("other", () => {
  beforeEach(() => {
    reset();
  });

  it("score", () => {
    score.value = 0;
    board.value[0][0] = createTile(2);
    board.value[1][0] = createTile(2);
    move("ArrowUp");

    expect(score.value).toBe(4);
  });

  it("score", () => {
    score.value = 0;
    board.value[0][0] = createTile(2);
    board.value[1][0] = createTile(2);
    move("ArrowUp");

    expect(score.value).toBe(4);
  });

  it("should over", () => {
    const overBoard = [
      [2, 4, 8, 16],
      [8, 2, 4, 2],
      [2, 32, 64, 128],
      [4, 2, 256, 8],
    ];
    setBoard(overBoard);

    expect(isOver()).toBe(true);
  });

  it("should not over", () => {
    const notOverBoard = [
      [2, 4, 8, 16],
      [8, 2, 4, 2],
      [2, 32, 64, 128],
      [4, 2, 256, 256],
    ];
    setBoard(notOverBoard);

    expect(isOver()).toBe(false);
  });

  it("should you win", () => {
    win.value = false;
    const notOverBoard = [
      [2, 4, 8, 16],
      [8, 2, 4, 2],
      [2, 32, 64, 128],
      [4, 2, 1024, 1024],
    ];
    setBoard(notOverBoard);

    move("ArrowRight");

    expect(win.value).toBe(true);
  });
});
