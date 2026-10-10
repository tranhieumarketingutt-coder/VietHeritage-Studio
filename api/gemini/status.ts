import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executeStatusHandler } from "../../server/handlers";

/**
 * Vercel serverless function endpoint for status inquiry.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { statusCode, data } = await executeStatusHandler();
  res.status(statusCode).json(data);
}
