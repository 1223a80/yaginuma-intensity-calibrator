import "./styles.css";

import { mountApp } from "./app";
import { createVideoRenderer, getPosterPath } from "./video-renderer";

const app = document.querySelector<HTMLElement>("#app");
if (!app) throw new Error("找不到应用挂载节点");

const poster = document.createElement("img");
poster.className = "ssr-poster";
poster.src = getPosterPath(0, import.meta.env.BASE_URL);
poster.alt = "";
poster.setAttribute("aria-hidden", "true");

let renderScore = (_score: number): void => undefined;
const controller = mountApp(app, (score) => renderScore(score), poster);
const renderer = createVideoRenderer(controller.canvas, import.meta.env.BASE_URL);
renderScore = (score) => renderer.render(score);

async function loadMedia(): Promise<void> {
  try {
    const initialScore = controller.score;
    await renderer.drawPoster(poster, initialScore);
    poster.remove();
    controller.setFirstFrameReady();
    renderer.render(initialScore);
    await renderer.loadVideo();
    controller.setReady();
  } catch {
    controller.setError("连续画面加载失败，请刷新重试");
  }
}

void loadMedia();
