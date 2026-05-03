/**
 * vite.config.ts - Production-ready configuration for React + SCSS + TypeScript
 * 
 * This config includes:
 * - React Fast Refresh for HMR (hot module replacement)
 * - SCSS preprocessing with CSS modules support
 * - TypeScript support
 * - Production optimization
 * - CSS minification
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    // Path aliases for cleaner imports
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },

  css: {
    // SCSS/SASS preprocessing
    preprocessorOptions: {
      scss: {
      },
    },
    // CSS module configuration
    modules: {
      localsConvention: 'camelCase',
    },
  },

  server: {
    // Local development server
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
  },

  build: {
    // Production build optimization
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    
    // Rollup options for optimization
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },

    // CSS minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },

    // Report compressed size
    reportCompressedSize: true,
    sourcemap: false, // Set to true for production debugging
  },

  // Environment variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
