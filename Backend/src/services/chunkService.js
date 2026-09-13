const {
  getAllContent,
  saveChunks,
} = require("./contentService");

const CHUNK_SIZE = 250;
const CHUNK_OVERLAP = 50;

const chunkContent = (content) => {
  if (!content || typeof content !== "string") {
    return [];
  }

  const words = content.trim().split(/\s+/);

  const chunks = [];

  for (
    let i = 0;
    i < words.length;
    i += CHUNK_SIZE - CHUNK_OVERLAP
  ) {
    const chunk = words
      .slice(i, i + CHUNK_SIZE)
      .join(" ");

    chunks.push(chunk);
  }

  return chunks;
};

const processAllDocuments = async () => {
  const documents = await getAllContent();

  let processedDocuments = 0;
  let totalChunks = 0;

  for (const document of documents) {
    const chunks = chunkContent(document.content);

    if (!chunks.length) {
      continue;
    }

    await saveChunks(document.id, chunks);

    processedDocuments++;
    totalChunks += chunks.length;

    console.log(
      `Created ${chunks.length} chunks for Content ID: ${document.id}`
    );
  }

  return {
    processedDocuments,
    totalChunks,
  };
};

module.exports = {
  chunkContent,
  processAllDocuments,
};