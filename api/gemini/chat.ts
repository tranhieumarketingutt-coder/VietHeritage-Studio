import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executeChatHandler } from "../../server/handlers";

/**
 * Vercel serverless function endpoint for chat consultation.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const { statusCode, data } = await executeChatHandler(payload);
  res.status(statusCode).json(data);
}
