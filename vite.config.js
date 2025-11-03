import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.pop() ?? "";
const isGithubPages = process.env.GITHUB_PAGES === "true" && repoName;

export default defineConfig({
  plugins: [react()],
  base: isGithubPages ? `/${repoName}/` : "/",
  server: {
    port: 5173,
    open: true
  }
});
