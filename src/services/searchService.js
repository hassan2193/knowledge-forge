const pool = require("../config/db");
const { generateEmbeddings } = require("./embeddingService");

const generateQueryEmbedding = async (question) => {
  const embeddings = await generateEmbeddings([question]);
  return embeddings[0];
};

const searchSimilarChunks = async (embedding, limit = 5) => {
  const vector = `[${embedding.join(",")}]`;

  // Fetch more chunks so we can remove duplicates
  const result = await pool.query(
    `
    SELECT
      cc.content,
      cc.content_id,
      ec.title,
      ec.url,
      embedding <=> $1::vector AS distance
    FROM content_chunks cc
    JOIN extracted_content ec
      ON ec.id = cc.content_id
    ORDER BY embedding <=> $1::vector
    LIMIT 15
    `,
    [vector],
  );
  //<==> is the operator for vector distance in PostgreSQL with the pgvector extension. It calculates the distance between the stored embeddings and the provided embedding, allowing for similarity searches based on vector representations of text.
  // Remove duplicate articles
  const seen = new Set();
  const uniqueChunks = [];

  for (const row of result.rows) {
    if (seen.has(row.content_id)) continue;

    seen.add(row.content_id);

    uniqueChunks.push({
      title: row.title,
      url: row.url,
      content: row.content,
      distance: row.distance,
    });

    if (uniqueChunks.length === limit) break;
  }

  return uniqueChunks;
};

module.exports = {
  generateQueryEmbedding,
  searchSimilarChunks,
};
