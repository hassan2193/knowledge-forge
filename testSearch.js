require("dotenv").config();

const {
  generateQueryEmbedding,
  searchSimilarChunks,
} = require("./src/services/searchService");

(async () => {
  try {
    const embedding = await generateQueryEmbedding("What is Event Loop?");

    const chunks = await searchSimilarChunks(embedding);

    console.log(chunks);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
