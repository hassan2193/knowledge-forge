const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateText = async (prompt) => {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      temperature: 0.3,
      maxOutputTokens: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS) || 4096,
    },
  });

  return response.text;
};

module.exports = {
  generateText,
};
