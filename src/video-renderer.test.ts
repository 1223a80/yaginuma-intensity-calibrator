// @vitest-environment jsdom

import { afterEach, describe, expect, it } from "vitest";
import {
  createVideoRenderer,
  getPosterPath,
  scoreToVideoFrame,
  scoreToVideoTime,
} from "./video-renderer";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("video renderer mapping", () => {
  it("uses the center portrait for score zero", () => {
    expect(getPosterPath(0, "/")).toBe("/frames/frame-15.webp");
    expect(scoreToVideoFrame(-15)).toBe(0);
    expect(scoreToVideoFrame(0)).toBe(120);
    expect(scoreToVideoFrame(15)).toBe(240);
    expect(scoreToVideoTime(0, 8)).toBe(4);
  });

  it("adds the Yaginuma WebM and MP4 sources", () => {
    const canvas = document.createElement("canvas");
    document.body.append(canvas);
    createVideoRenderer(canvas, "/demo/");

    const sources = Array.from(document.querySelectorAll<HTMLSourceElement>("video source"));
    expect(sources.map((source) => source.src)).toEqual([
      "http://localhost:3000/demo/video/yaginuma-evolution.webm",
      "http://localhost:3000/demo/video/yaginuma-evolution.mp4",
    ]);
  });
});
