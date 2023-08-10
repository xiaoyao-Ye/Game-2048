export interface Tile {
  value: number;
  merged: boolean;
  id: number;
}

export type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
