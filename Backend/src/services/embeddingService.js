const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateEmbeddings = async (texts) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts,
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings.map((e) => e.values);
};

module.exports = {
  generateEmbeddings,
};
