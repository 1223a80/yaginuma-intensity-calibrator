// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { mountApp } from "./app";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mountApp", () => {
  it("renders the customized six-stage experience without voting UI", () => {
    const root = document.createElement("main");
    document.body.append(root);

    mountApp(root);

    expect(root.querySelector("h1")?.textContent).toBe("滑动变祖器");
    expect(root.querySelector(".eyebrow")?.textContent).toBe(
      "YAGINUMA INTENSITY CALIBRATOR",
    );
    expect(root.querySelectorAll(".tick")).toHaveLength(31);
    expect(
      Array.from(root.querySelectorAll(".stage-marker"), (node) => node.textContent),
    ).toEqual(["八嘎", "牢八", "金毛", "八木沼", "金发天才", "八神"]);
    expect(root.querySelector(".drag-hint")?.textContent?.replace(/\s+/g, " ").trim()).toBe(
      "← 拖动滑杆，观察形态从 −15 进化至 +15。 →",
    );
    expect(root.textContent).not.toContain("投票");
    expect(root.querySelector(".timeline-panel")).toBeNull();
    expect(root.querySelector(".community-panel")).toBeNull();
  });

  it("updates stages, signed scores, loading state, and accessibility text", () => {
    const root = document.createElement("main");
    document.body.append(root);
    const onScoreChange = vi.fn();
    const app = mountApp(root, onScoreChange);

    expect(root.querySelector(".stage-name")?.textContent).toBe("金毛");
    expect(root.querySelector(".level-output")?.textContent).toBe("00");
    expect(app.slider.disabled).toBe(true);

    app.setScore(-15);
    expect(root.querySelector(".stage-name")?.textContent).toBe("八嘎");
    expect(root.querySelector(".level-output")?.textContent).toBe("-15");

    app.setScore(15);
    expect(root.querySelector(".stage-name")?.textContent).toBe("八神");
    expect(root.querySelector(".level-output")?.textContent).toBe("+15");
    expect(app.slider.getAttribute("aria-valuetext")).toContain("八神");
    expect(onScoreChange).toHaveBeenLastCalledWith(15);

    app.setLoading(31, 31);
    expect(root.querySelector(".load-state")?.textContent).toBe("连续八力已就绪");
    app.setReady();
    expect(app.slider.disabled).toBe(false);
  });
});
