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
} from "./server/handlers";

dotenv.config({ path: ".env.local" });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json({ limit: "25mb" }));

app.get("/api/gemini/status", async (_req: Request, res: Response) => {
  const { statusCode, data } = await executeStatusHandler();
  res.status(statusCode).json(data);
});

app.post("/api/gemini/chat", async (req: Request, res: Response) => {
  const { statusCode, data } = await executeChatHandler(req.body);
  res.status(statusCode).json(data);
});

app.post("/api/gemini/styling", async (req: Request, res: Response) => {
  const { statusCode, data } = await executeStylingHandler(req.body);
  res.status(statusCode).json(data);
});

app.post("/api/gemini/try-on", async (req: Request, res: Response) => {
  const { statusCode, data } = await executeTryOnHandler(req.body);
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
