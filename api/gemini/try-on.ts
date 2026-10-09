import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleGeminiVirtualTryOn } from '../../src/geminiService.ts';

export const config = {
  maxDuration: 60,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const result = await handleGeminiVirtualTryOn(body);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('API /api/gemini/try-on error:', error);
    return res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
}
