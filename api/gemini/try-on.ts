import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executeTryOnHandler } from "../../server/handlers";

export const config = {
  maxDuration: 60,
};

/**
 * Vercel serverless function endpoint for virtual try-on image generation.
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
  const { statusCode, data } = await executeTryOnHandler(payload);
  res.status(statusCode).json(data);
}
