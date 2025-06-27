import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow all hosts
    allowedHosts: [".repl.co", ".replit.dev"], // Allow all hostnames
    hmr: {
      clientPort: 443, // Use HTTPS port for Replit
    },
    headers: {
      "X-Frame-Options": "ALLOWALL",
      "Content-Security-Policy": "frame-ancestors *",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
