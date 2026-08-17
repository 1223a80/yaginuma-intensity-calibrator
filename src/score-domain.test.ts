import { describe, expect, it } from "vitest";
import {
  clampScore,
  describeScore,
  formatSignedScore,
} from "./score-domain";

describe("score domain", () => {
  it.each([
    [-15, 0, "八嘎"],
    [-9, 6, "牢八"],
    [-3, 12, "金毛"],
    [3, 18, "八木沼"],
    [9, 24, "金发天才"],
    [15, 30, "八神"],
  ])("maps score %i to frame %i and stage %s", (score, frameIndex, stage) => {
    expect(describeScore(score)).toMatchObject({ frameIndex, stage });
  });

  it("clamps positions and formats signed values", () => {
    expect(clampScore(-20)).toBe(-15);
    expect(clampScore(20)).toBe(15);
    expect(formatSignedScore(-3)).toBe("-03");
    expect(formatSignedScore(0)).toBe("00");
    expect(formatSignedScore(9)).toBe("+09");
  });
});
