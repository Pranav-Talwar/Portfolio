import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For personal/organization site (pranav-talwar.github.io):
export default defineConfig({
  plugins: [react()],
  base: '/',
})
