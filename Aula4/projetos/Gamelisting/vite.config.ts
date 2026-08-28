import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')
  const isGitHubPages = mode === 'production' && env.GITHUB_PAGES === 'true'
  
  return {
    plugins: [react()],
    base: isGitHubPages ? '/Gamelisting/' : '/',
  }
})
