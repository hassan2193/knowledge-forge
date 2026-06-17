const pool = require("../config/db");

const getAllArticles = async () => {
  const query = `
    SELECT
      id,
      title,
      source,
      created_at
    FROM extracted_content
    ORDER BY id DESC
  `;

  const result = await pool.query(query);

  return result.rows;
};

const getArticleById = async (id) => {
  const query = `
    SELECT
      id,
      title,
      source,
      content,
      content_length,
      created_at
    FROM extracted_content
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

const searchArticles = async (query) => {
  const sql = `SELECT
  id,
  title,
  source,
  category,
  content_type,
  created_at
FROM extracted_content
WHERE title ILIKE $1
LIMIT 10
`;

  const result = await pool.query(sql, [`%${query}%`]);

  return result.rows;
};

module.exports = {
  getAllArticles,
  getArticleById,
  searchArticles,
};
