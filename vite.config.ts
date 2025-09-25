import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.exr', '**/*.dmat', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.webp']
})