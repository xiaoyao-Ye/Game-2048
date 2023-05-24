import { it, expect, describe, beforeEach } from "vitest";
import { createTile, addTile, reset, board, move, score } from "./Game";

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

  it("score", () => {
    score.value = 0;
    board.value[0][0] = createTile(2);
    board.value[1][0] = createTile(2);
    move("up");

    expect(score.value).toBe(4);
  });
});

describe("test move", () => {
  beforeEach(() => {
    reset();
  });

  it("should move tiles up : Easy", () => {
    board.value[2][0] = createTile(2);
    board.value[3][1] = createTile(2);

    move("up");

    expect(board.value[2][0].value).toBe(0);
    expect(board.value[3][1].value).toBe(0);
    expect(board.value[0][0].value).toBe(2);
    expect(board.value[0][1].value).toBe(2);
  });

  it("should move tiles up : Medium", () => {
    board.value[1][0] = createTile(4);
    board.value[2][0] = createTile(2);
    board.value[3][0] = createTile(4);

    move("up");

    expect(board.value[0][0].value).toBe(4);
    expect(board.value[1][0].value).toBe(2);
    expect(board.value[2][0].value).toBe(4);
  });

  it("should move tiles down", () => {
    board.value[1][0] = createTile(2);
    board.value[2][1] = createTile(2);

    move("down");

    expect(board.value[1][0].value).toBe(0);
    expect(board.value[2][1].value).toBe(0);
    expect(board.value[3][0].value).toBe(2);
    expect(board.value[3][1].value).toBe(2);
  });

  it("should move tiles left", () => {
    board.value[0][2] = createTile(2);
    board.value[3][3] = createTile(2);

    move("left");

    expect(board.value[0][2].value).toBe(0);
    expect(board.value[3][3].value).toBe(0);
    expect(board.value[0][0].value).toBe(2);
    expect(board.value[3][0].value).toBe(2);
  });

  it("should move tiles right", () => {
    board.value[0][2] = createTile(2);
    board.value[1][1] = createTile(2);

    move("right");

    expect(board.value[0][2].value).toBe(0);
    expect(board.value[1][1].value).toBe(0);
    expect(board.value[0][3].value).toBe(2);
    expect(board.value[1][3].value).toBe(2);
  });
});

describe("merge", () => {
  beforeEach(() => {
    reset();
  });

  it("should merge tiles when moving up", () => {
    board.value[0][0] = createTile(2);
    board.value[1][0] = createTile(2);
    move("up");
    expect(board.value[0][0].value).toBe(4);
    expect(board.value[1][0].value).toBe(0);
  });

  it("should merge tiles when moving down", () => {
    board.value[0][0] = createTile(2);
    board.value[1][0] = createTile(2);
    move("down");
    expect(board.value[3][0].value).toBe(4);
    expect(board.value[1][0].value).toBe(0);
  });

  it("should merge tiles when moving left", () => {
    board.value[0][0] = createTile(2);
    board.value[0][1] = createTile(2);
    move("left");
    expect(board.value[0][0].value).toBe(4);
    expect(board.value[0][1].value).toBe(0);
  });

  it("should merge tiles when moving right", () => {
    board.value[0][0] = createTile(2);
    board.value[0][1] = createTile(2);
    move("right");
    expect(board.value[0][3].value).toBe(4);
    expect(board.value[0][1].value).toBe(0);
  });

  it("should merge tiles when moving left", () => {
    board.value[3][0] = createTile(2);
    board.value[3][1] = createTile(2);
    board.value[3][2] = createTile(2);
    board.value[3][3] = createTile(2);

    move("left");

    expect(board.value[3][0].value).toBe(4);
    expect(board.value[3][1].value).toBe(4);
    expect(board.value[3][2].value).toBe(0);
    expect(board.value[3][3].value).toBe(0);
  });

  it("should merge tiles when moving left", () => {
    board.value[3][0] = createTile(2);
    board.value[3][1] = createTile(2);
    board.value[3][2] = createTile(4);
    board.value[3][3] = createTile(8);

    move("left");

    expect(board.value[3][0].value).toBe(4);
    expect(board.value[3][1].value).toBe(4);
    expect(board.value[3][2].value).toBe(8);
    expect(board.value[3][3].value).toBe(0);

    move("left");

    expect(board.value[3][0].value).toBe(8);
    expect(board.value[3][1].value).toBe(8);
    expect(board.value[3][2].value).toBe(0);
    expect(board.value[3][3].value).toBe(0);
  });
});

describe("test", () => {
  // TODO: 可能需要 browser 环境
  it.skip("should add handle", () => {});

  it.todo("should add score", () => {});

  it.todo("should you win", () => {});

  it.todo("should over", () => {});
});
