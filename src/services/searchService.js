const pool = require("../config/db");
const { generateEmbeddings } = require("./embeddingService");

const generateQueryEmbedding = async (question) => {
  const embeddings = await generateEmbeddings([question]);

  return embeddings[0];
};

const searchSimilarChunks = async (embedding, limit = 5) => {
  const vector = `[${embedding.join(",")}]`;

  const result = await pool.query(
    `
    SELECT
      content,
      embedding <=> $1::vector AS distance
    FROM content_chunks
    ORDER BY embedding <=> $1::vector
    LIMIT $2
    `,
    [vector, limit],
  );
  //<==> is the operator for vector distance in PostgreSQL with the pgvector extension. It calculates the distance between the stored embeddings and the provided embedding, allowing for similarity searches based on vector representations of text.
  return result.rows;
};

module.exports = {
  generateQueryEmbedding,
  searchSimilarChunks,
};
