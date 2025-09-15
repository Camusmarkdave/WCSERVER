import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/postAdmin': 'http://localhost:5000',
      '/getStudent': 'http://localhost:5000'
    }
  }
});
