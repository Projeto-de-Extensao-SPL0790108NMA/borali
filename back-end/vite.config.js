import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'build', 'dist'],
    },
  },
})
