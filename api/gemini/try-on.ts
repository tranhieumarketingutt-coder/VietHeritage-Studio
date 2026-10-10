import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executeTryOnHandler } from "../../server/handlers.ts";

export const config = {
  maxDuration: 60,
};

function getClientIdentifier(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "global";
}

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
  const clientIp = getClientIdentifier(req);
  const { statusCode, data } = await executeTryOnHandler(payload, clientIp);
  res.status(statusCode).json(data);
}
