import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, type Plugin } from "vite";
import {
  executeStatusHandler,
  executeChatHandler,
  executeStylingHandler,
  executeTryOnHandler,
} from "./server/handlers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_BODY_BYTES = 10 * 1024 * 1024;

/**
 * Dev server middleware simulating serverless API endpoints in local Vite environment.
 */
function geminiDevApiPlugin(): Plugin {
  return {
    name: "vite-gemini-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || "";
        const pathname = rawUrl.split("?")[0];

        if (!pathname.startsWith("/api/gemini/")) {
          return next();
        }

        const readJsonBody = async (): Promise<unknown> => {
          return new Promise((resolve, reject) => {
            let body = "";
            let receivedBytes = 0;

            req.on("data", (chunk: Buffer | string) => {
              receivedBytes += typeof chunk === "string" ? Buffer.byteLength(chunk) : chunk.length;
              if (receivedBytes > MAX_BODY_BYTES) {
                req.destroy();
                reject(new Error("PAYLOAD_TOO_LARGE"));
                return;
              }
              body += chunk;
            });

            req.on("end", () => {
              try {
                resolve(JSON.parse(body || "{}"));
              } catch {
                resolve({});
              }
            });

            req.on("error", (err) => {
              reject(err);
            });
          });
        };

        res.setHeader("Content-Type", "application/json");

        try {
          if (pathname === "/api/gemini/status" && req.method === "GET") {
            const { statusCode, data } = await executeStatusHandler();
            res.statusCode = statusCode;
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname === "/api/gemini/chat" && req.method === "POST") {
            const payload = await readJsonBody();
            const { statusCode, data } = await executeChatHandler(payload);
            res.statusCode = statusCode;
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname === "/api/gemini/styling" && req.method === "POST") {
            const payload = await readJsonBody();
            const { statusCode, data } = await executeStylingHandler(payload);
            res.statusCode = statusCode;
            res.end(JSON.stringify(data));
            return;
          }

          if (pathname === "/api/gemini/try-on" && req.method === "POST") {
            const payload = await readJsonBody();
            const { statusCode, data } = await executeTryOnHandler(payload);
            res.statusCode = statusCode;
            res.end(JSON.stringify(data));
            return;
          }
        } catch (err: unknown) {
          if (err instanceof Error && err.message === "PAYLOAD_TOO_LARGE") {
            res.statusCode = 413;
            res.end(JSON.stringify({ error: "Kích thước yêu cầu vượt quá giới hạn cho phép." }));
            return;
          }
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Lỗi máy chủ phát triển nội bộ." }));
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
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
