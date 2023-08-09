import { it, expect, describe } from "vitest";
import { addTile, generateBoard, generateTile } from "./board";

describe("board", () => {
  it("should generate tile with random value", () => {
    const res = generateTile();

    expect(res.value).toBeGreaterThanOrEqual(2);
    expect(res.value).toBeLessThanOrEqual(4);
  });

  it("should generate tile", () => {
    expect(generateTile(2)).toEqual({ value: 2, merged: false });
  });

  it("should generate board", () => {
    // const board = [
    //   [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
    //   [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
    //   [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
    //   [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
    // ];
    // expect(generateBoard(4)).toEqual(board);

    const board = generateBoard(4);

    expect(board.length).toBe(4); // 4 列
    expect(board.every(row => row.length === 4)).toBe(true); // 4 行
    expect(board.flat().every(tile => tile.value === 0 && !tile.merged)).toBe(true); // 都是空格子
  });

  it("should add tile", () => {
    const board = generateBoard(4);
    const tile = generateTile(2);

    addTile(board, tile);

    expect(board.some(row => row.some(tile => tile.value === 2))).toBe(true);
  });
});
