import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,       // Log compression details to the console
      disable: false,      // Enable compression
      threshold: 10240,    // Compress files larger than 10 KB
      algorithm: 'gzip',   // Use gzip compression (you can also use 'brotli' here)
      ext: '.gz',          // Set the extension for compressed files
    }),
  ],
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  }
})
