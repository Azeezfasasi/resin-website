import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/resin-by-saidat/',
  css: {
    postcss: './postcss.config.cjs',
  },
})
