require("dotenv").config();

const { generateEmbedding } = require("./src/services/embeddingService");

(async () => {
  try {
    const embedding = await generateEmbedding(
      "Node.js Event Loop executes asynchronous callbacks.",
    );

    console.log(`Dimensions: ${embedding.length}`);
    console.log(embedding.slice(0, 10));
  } catch (error) {
    console.error(error);
  }
})();
