require("dotenv").config();

const {
  getContentWithoutChunks,
  saveChunks,
} = require("../src/services/contentService");

const { chunkContent } = require("../src/services/chunkService");

(async () => {
  try {
    const documents = await getContentWithoutChunks();

    console.log(
      `Found ${documents.length} unchunked documents\n`
    );

    if (!documents.length) {
      console.log("No new documents to chunk.");
      return;
    }

    for (const document of documents) {
      console.log(`Processing Content ID: ${document.id}`);

      const chunks = chunkContent(document.content);

      await saveChunks(document.id, chunks);

      console.log(
        `Saved ${chunks.length} chunks for Content ID: ${document.id}\n`
      );
    }

    console.log("Chunks Seeded Successfully");
  } catch (error) {
    console.error("Chunking Error:", error);
  } finally {
    process.exit(0);
  }
})();