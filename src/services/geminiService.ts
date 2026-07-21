import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzeTicket(
  title: string,
  description: string
) {
const prompt = `
You are a Senior ZEISS Biomedical Equipment Engineer.

Analyze this medical equipment support ticket.

Ticket Title:
${title}

Ticket Description:
${description}

Respond ONLY in JSON.

{
  "riskScore": 0,
  "severity": "Low | Medium | High | Critical",
  "confidence": 0,
  "likelyCause": "",
  "recommendation": "",
  "estimatedDowntime": "",
  "maintenancePriority": "",
  "engineerRequired": "",
  "partsNeeded": [],
  "preventiveActions": []
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  const text = response.text ?? "";

  const cleanJson = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanJson);
}