// server.js
import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";

// ==========================
// CONFIG
// ==========================
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Enable CORS for frontend (Vite default port 5173)
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Multer config for file uploads
const upload = multer({ dest: "uploads/" });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ==========================
// ROUTES
// ==========================

app.get("/", (req, res) => {
  res.send("EHR AI Backend is running 🚑");
});

app.post("/api/generate-ehr", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    console.log("Received audio file:", req.file.path);

    // Step 1: Speech → Text (Whisper)
    const transcript = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "whisper-1",
    });

    console.log("Transcript:", transcript.text);

    // Step 2: Convert text → FHIR JSON
    const prompt = `
You are a senior clinical documentation expert.
Convert doctor notes into valid FHIR R4 JSON.
Output ONLY JSON.

Doctor Note:
"""${transcript.text}"""
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const fhirJson = JSON.parse(completion.choices[0].message.content);

    // Remove uploaded file after processing
    fs.unlinkSync(req.file.path);

    // Send response
    res.json({
      id: uuidv4(),
      transcript: transcript.text,
      fhir: fhirJson,
      createdAt: new Date().toISOString(),
    });

  } catch (err) {
    console.error("EHR generation error:", err);
    res.status(500).json({ error: "Failed to generate EHR" });
  }
});

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`🚑 Backend running on ${PORT}`);
});
