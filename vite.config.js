import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths, as GitHub Pages serves the site from /<repo-name>/.
  base: './',
  plugins: [react(), tailwindcss()],
})
