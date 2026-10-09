import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleGeminiChat, handleGeminiStyling, handleGeminiVirtualTryOn, getGeminiStatus } from './src/geminiService.ts';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Increase JSON limit to support high-resolution user image base64 uploads
app.use(express.json({ limit: '25mb' }));

// API Routes
app.get('/api/gemini/status', (_req: Request, res: Response) => {
  res.json(getGeminiStatus());
});

app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { message, lang } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }
    const result = await handleGeminiChat(message, lang || 'vi');
    res.json(result);
  } catch (error: any) {
    console.error('Server error on /api/gemini/chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/gemini/styling', async (req: Request, res: Response) => {
  try {
    const result = await handleGeminiStyling(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Server error on /api/gemini/styling:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Virtual Try-On endpoint with model gemini-3.1-flash-image
app.post('/api/gemini/try-on', async (req: Request, res: Response) => {
  try {
    const result = await handleGeminiVirtualTryOn(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Server error on /api/gemini/try-on:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static assets from Vite build in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🌸 VietHeritage Remix Server running at http://localhost:${port}`);
  console.log(`🤖 Gemini Status: ${getGeminiStatus().hasApiKey ? 'Connected (Live API)' : 'Offline Curated Mode'}`);
});
