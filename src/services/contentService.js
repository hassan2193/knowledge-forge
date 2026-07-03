const pool = require("../config/db");

const saveContent = async ({
  url,
  source,
  title,
  content,
  contentLength,
  category,
  contentType,
  render,
}) => {
  const query = `
    INSERT INTO extracted_content
    (
      url,
      source,
      title,
      content,
      content_length,
      category,
      content_type,
      render
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8
    )
    ON CONFLICT (url)
    DO UPDATE SET
      source = EXCLUDED.source,
      title = EXCLUDED.title,
      content = EXCLUDED.content,
      content_length = EXCLUDED.content_length,
      category = EXCLUDED.category,
      content_type = EXCLUDED.content_type,
      render = EXCLUDED.render
  `;

  await pool.query(query, [
    url,
    source,
    title,
    content,
    contentLength,
    category,
    contentType,
    render,
  ]);
};

const getAllUrls = async () => {
  const result = await pool.query(`
    SELECT url
    FROM extracted_content
  `);

  return result.rows.map((row) => row.url);
};

const getAllContent = async () => {
  const result = await pool.query(`
    SELECT id, content
    FROM extracted_content
    ORDER BY id
  `);

  return result.rows;
};

const saveChunks = async (contentId, chunks) => {
  if (!chunks.length) return;

  const values = [];
  const placeholders = [];

  chunks.forEach((chunk, index) => {
    const offset = index * 3;

    placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);

    values.push(contentId, index, chunk);
  });

  const query = `
    INSERT INTO content_chunks
    (
      content_id,
      chunk_index,
      content
    )
    VALUES
    ${placeholders.join(",")}
  `;

  await pool.query(query, values);
};

module.exports = {
  saveContent,
  getAllUrls,
  getAllContent,
  saveChunks,
};
