import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
