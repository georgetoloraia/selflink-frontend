import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "selflink-frontend";
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProduction ? `/${repoName}/` : "/",
  build: {
    outDir: "docs",
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
