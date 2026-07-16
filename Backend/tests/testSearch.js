require("dotenv").config();

const {
  generateQueryEmbedding,
  searchSimilarChunks,
} = require("./src/services/searchService");

(async () => {
  try {
    const question = process.argv[2] || "What is Express Middlewear?";
    const embedding = await generateQueryEmbedding(question);

    const chunks = await searchSimilarChunks(embedding);

    console.log("\nQuestion:", question);

    chunks.forEach((chunk, index) => {
      console.log("\n---------------------------");
      console.log("Chunk", index + 1);
      console.log("Distance:", chunk.distance);
      console.log(chunk.content.substring(0, 500));
    });
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
