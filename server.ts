import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini code generator
  app.post("/api/generate-project", async (req, res) => {
    try {
      const { promptText } = req.body;
      if (!promptText) {
        return res.status(400).json({ error: "Missing promptText" });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a very short title (max 5 words) and suggest a dark hex color code that fits the mood of this project description. Output valid JSON only with 'title' and 'placeholderBg' keys. Description: ${promptText}`,
      });

      const text = response.text || '';
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        res.json(parsed);
      } else {
        res.status(500).json({ error: "Invalid response from AI" });
      }
    } catch (err: any) {
      console.error("AI generation error:", err);
      // Return a safer error message to the client
      res.status(500).json({ error: "Failed to generate AI data" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
