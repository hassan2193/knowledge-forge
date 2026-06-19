const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS) || 4096,
  },
});

const generateText = async (prompt) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateText,
};
