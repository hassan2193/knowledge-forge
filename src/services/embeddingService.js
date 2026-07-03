const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});

const generateEmbedding = async (text) => {
  if (!text) {
    throw new Error("Text is required");
  }

  const result = await model.embedContent({
    content: {
      parts: [
        {
          text,
        },
      ],
    },
    outputDimensionality: 768,
  });

  return result.embedding.values;
};

module.exports = {
  generateEmbedding,
};
