import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  const base = mode === 'production' ? '/test/' : '/';
  
  return {
    base,
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    publicDir: 'public',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // ĐẢM BẢO FILE PUBLIC ĐƯỢC COPY
      assetsInclude: ['**/*.mp3'],
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.mp3')) {
              return 'assets/[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    }
  };
});