const { processAllDocuments } = require("../services/chunkService");
const { processAllEmbeddings } = require("../services/embeddingService");

const generateChunks = async (req, res) => {
  try {
    const result = await processAllDocuments();

    res.json({
      success: true,
      message: "Chunks generated successfully",
      ...result,
    });
  } catch (error) {
    console.error("CHUNK ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const generateEmbeddings = async (req, res) => {
  try {
    const result = await processAllEmbeddings();

    res.json({
      success: true,
      message: "Embeddings generated successfully",
      ...result,
    });
  } catch (error) {
    console.error("EMBEDDING ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateChunks,
  generateEmbeddings,
};