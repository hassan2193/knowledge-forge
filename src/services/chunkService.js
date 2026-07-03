const CHUNK_SIZE = 250;
const CHUNK_OVERLAP = 50;

const chunkContent = (content) => {
  if (!content || typeof content !== "string") {
    return [];
  }

  const words = content.trim().split(/\s+/);

  const chunks = [];

  for (let i = 0; i < words.length; i += CHUNK_SIZE - CHUNK_OVERLAP) {
    const chunk = words.slice(i, i + CHUNK_SIZE).join(" ");

    chunks.push(chunk);
  }

  return chunks;
};

module.exports = {
  chunkContent,
};
