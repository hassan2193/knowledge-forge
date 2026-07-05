require("dotenv").config();

const {
  getChunksWithoutEmbeddings,
  saveEmbedding,
} = require("./src/services/contentService");

const { generateEmbeddings } = require("./src/services/embeddingService");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  try {
    const batchSize = 5;

    const chunks = await getChunksWithoutEmbeddings();

    console.log(`Found ${chunks.length} chunks\n`);

    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);

      console.log(
        `Processing Batch ${Math.floor(i / batchSize) + 1} (${batch.length} chunks)`,
      );

      const texts = batch.map((chunk) => chunk.content);

      let embeddings = null;

      while (!embeddings) {
        try {
          embeddings = await generateEmbeddings(texts);
        } catch (error) {
          if (error.status === 429) {
            console.log("\n  Rate limit hit.");
            console.log("Waiting 60 seconds...\n");

            await sleep(60000);

            continue;
          }

          throw error;
        }
      }

      for (let j = 0; j < batch.length; j++) {
        await saveEmbedding(batch[j].id, embeddings[j]);

        console.log(
          `[${i + j + 1}/${chunks.length}] Saved Chunk ${batch[j].id}`,
        );
      }

      console.log("");
    }

    console.log("All embeddings generated successfully.");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
