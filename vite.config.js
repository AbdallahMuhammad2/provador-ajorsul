import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  },
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.exr', '**/*.dmat', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.webp']
})