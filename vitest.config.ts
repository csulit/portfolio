import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [tailwindcss() as any, viteReact() as any],
  test: {
    environment: 'jsdom',
  },
})
