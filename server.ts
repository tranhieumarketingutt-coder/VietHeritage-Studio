import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  executeStatusHandler,
  executeChatHandler,
  executeStylingHandler,
  executeTryOnHandler,
} from "./server/handlers.ts";

dotenv.config({ path: ".env.local" });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json({ limit: "25mb" }));

function getClientIdentifier(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "global";
}

app.get("/api/gemini/status", async (_req: Request, res: Response) => {
  const { statusCode, data } = await executeStatusHandler();
  res.status(statusCode).json(data);
});

app.post("/api/gemini/chat", async (req: Request, res: Response) => {
  const clientIp = getClientIdentifier(req);
  const { statusCode, data } = await executeChatHandler(req.body, clientIp);
  res.status(statusCode).json(data);
});

app.post("/api/gemini/styling", async (req: Request, res: Response) => {
  const clientIp = getClientIdentifier(req);
  const { statusCode, data } = await executeStylingHandler(req.body, clientIp);
  res.status(statusCode).json(data);
});

app.post("/api/gemini/try-on", async (req: Request, res: Response) => {
  const clientIp = getClientIdentifier(req);
  const { statusCode, data } = await executeTryOnHandler(req.body, clientIp);
  res.status(statusCode).json(data);
});

const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));

app.get("*", (_req: Request, res: Response) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send("VietHeritage Remix Server is running. Run `npm run build` to generate the client bundle.");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`VietHeritage Remix Server listening on port ${port}`);
});
