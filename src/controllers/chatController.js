const { generateText } = require("../services/aiService");

const {
  generateQueryEmbedding,
  searchSimilarChunks,
} = require("../services/searchService");

const { buildRagPrompt } = require("../prompts/ragPrompt");

const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const embedding = await generateQueryEmbedding(question);

    const chunks = await searchSimilarChunks(embedding);

    const prompt = buildRagPrompt(question, chunks);

    const answer = await generateText(prompt);

    return res.json({
      success: true,
      answer,
      sources: chunks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  chat,
};
