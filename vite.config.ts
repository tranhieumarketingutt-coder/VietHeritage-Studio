import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';
import { handleGeminiChat, handleGeminiStyling, handleGeminiVirtualTryOn, getGeminiStatus } from './src/geminiService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function geminiDevApiPlugin(): Plugin {
  return {
    name: 'vite-gemini-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/gemini/')) {
          return next();
        }

        const readJsonBody = async (): Promise<any> => {
          return new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                resolve(JSON.parse(body || '{}'));
              } catch {
                resolve({});
              }
            });
          });
        };

        res.setHeader('Content-Type', 'application/json');

        if (req.url === '/api/gemini/status' && req.method === 'GET') {
          res.end(JSON.stringify(getGeminiStatus()));
          return;
        }

        if (req.url === '/api/gemini/chat' && req.method === 'POST') {
          const body = await readJsonBody();
          const result = await handleGeminiChat(body.message || '', body.lang || 'vi');
          res.end(JSON.stringify(result));
          return;
        }

        if (req.url === '/api/gemini/styling' && req.method === 'POST') {
          const body = await readJsonBody();
          const result = await handleGeminiStyling(body);
          res.end(JSON.stringify(result));
          return;
        }

        if (req.url === '/api/gemini/try-on' && req.method === 'POST') {
          const body = await readJsonBody();
          const result = await handleGeminiVirtualTryOn(body);
          res.end(JSON.stringify(result));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiDevApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
