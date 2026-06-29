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

module.exports = {
  saveContent,
  getAllUrls,
};
