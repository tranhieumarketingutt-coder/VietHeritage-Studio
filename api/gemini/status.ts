import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiStatus } from '../../src/geminiService.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const status = getGeminiStatus();
    return res.status(200).json(status);
  } catch (error: any) {
    console.error('API /api/gemini/status error:', error);
    return res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
}
