const pool = require("../config/db");

const getArticlesByCategory = async (category) => {
  const result = await pool.query(
    `
    SELECT title, content, source
    FROM extracted_content
    WHERE category = $1
    `,
    [category],
  );

  return result.rows;
};

const saveCourse = async ({ category, courseContent }) => {
  const result = await pool.query(
    `
    INSERT INTO courses
    (
      category,
      course_content
    )
    VALUES
    (
      $1,
      $2
    )
    RETURNING *
    `,
    [category, courseContent],
  );

  return result.rows[0];
};

const getCourses = async () => {
  const result = await pool.query(`
    SELECT
      id,
      category,
      created_at
    FROM courses
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getCourseById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM courses
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getArticlesByCategory,
  saveCourse,
  getCourses,
  getCourseById,
};
