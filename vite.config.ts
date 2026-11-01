import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

declare const process: { env: Record<string, string | undefined> };

// BASE_PATH lets the same build run at a domain root ("/") or under a GitHub Pages
// project path (e.g. "/win-win-4/"). The Pages workflow sets it automatically.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { port: 3000, host: true },
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks so app updates don't bust the framework cache
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(id)) return 'react';
        },
      },
    },
  },
});
