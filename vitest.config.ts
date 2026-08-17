import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "src/app.test.ts",
      "src/score-domain.test.ts",
      "src/video-renderer.test.ts",
    ],
  },
});
