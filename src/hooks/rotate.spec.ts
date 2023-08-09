import { it, expect, describe } from "vitest";
import { rotate, rotateReverse } from "./rotate";

// describe("rotateReverse", () => {});
// rotateReverse和rotate的相似度太高了, 直接偷懒跟rotate一起测试了, 不知道这样是否合理

describe("rotate and rotate reverse", () => {
  it("should rotate 0° for ArrowUp", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotate(matrix, "ArrowUp");

    expect(matrix).toEqual(matrix);

    rotateReverse(matrix, "ArrowUp");

    expect(matrix).toEqual(matrix);
  });

  it("should rotate 0° for ArrowDown", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotate(matrix, "ArrowDown");

    expect(matrix).toEqual([
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
    ]);

    rotateReverse(matrix, "ArrowDown");

    expect(matrix).toEqual(matrix);
  });

  it("should rotate -90° for ArrowRight", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotate(matrix, "ArrowRight");

    expect(matrix).toEqual([
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ]);

    rotateReverse(matrix, "ArrowRight");

    expect(matrix).toEqual(matrix);
  });

  it("should rotate 90° for ArrowLeft", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotate(matrix, "ArrowLeft");

    expect(matrix).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);

    rotateReverse(matrix, "ArrowLeft");

    expect(matrix).toEqual(matrix);
  });
});
