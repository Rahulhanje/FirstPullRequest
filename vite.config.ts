import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
