require("dotenv").config();

const { generateEmbeddings } = require("./src/services/embeddingService");

(async () => {
  try {
    const embeddings = await generateEmbeddings([
      "Hello",
      "World",
      "Node",
      "Express",
      "PostgreSQL",
    ]);

    const embedding = embeddings[0];

    console.log(`Dimensions: ${embedding.length}`);
    console.log(embedding.slice(0, 10));
  } catch (error) {
    console.error(error);
  }
})();
