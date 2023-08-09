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
    const board = [
      [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
      [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
      [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
      [generateTile(0), generateTile(0), generateTile(0), generateTile(0)],
    ];

    expect(generateBoard(4)).toEqual(board);
  });

  it("should add tile", () => {
    const board = generateBoard(4);
    const tile = generateTile(2);

    addTile(board, tile);

    expect(board.some(row => row.some(tile => tile.value === 2))).toBe(true);
  });
});
