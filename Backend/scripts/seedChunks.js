require("dotenv").config();

const { getAllContent, saveChunks } = require("./src/services/contentService");
const { chunkContent } = require("./src/services/chunkService");

(async () => {
  try {
    const documents = await getAllContent();

    for (const document of documents) {
      console.log(`Processing Content ID: ${document.id}`);

      const chunks = chunkContent(document.content);

      await saveChunks(document.id, chunks);

      console.log(
        `Saved ${chunks.length} chunks for Content ID: ${document.id}`,
      );
    }

    console.log("Chunks Seeded Successfully");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
