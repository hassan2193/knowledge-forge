const pool = require("../config/db");

const getArticlesByCategory = async (
  category,
  { articleLimit = 3, contentCharLimit = 1800 } = {},
) => {
  const result = await pool.query(
    `
    SELECT
      title,
      LEFT(content, $2::int) AS content,
      source
    FROM extracted_content
    WHERE category = $1
    ORDER BY id DESC
    LIMIT $3::int
    `,
    [category, contentCharLimit, articleLimit],
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

const createLessonKey = ({ category, moduleTitle, level, goal }) => {
  return [category, moduleTitle, level, goal]
    .map((value) =>
      String(value || "")
        .trim()
        .toLowerCase(),
    )
    .join(":");
};

const getLessonByKey = async ({ category, moduleTitle, level, goal }) => {
  const lessonKey = createLessonKey({
    category,
    moduleTitle,
    level,
    goal,
  });

  const result = await pool.query(
    `
    SELECT *
    FROM lessons
    WHERE lesson_key = $1
    `,
    [lessonKey],
  );

  return result.rows[0];
};

const saveLesson = async ({
  category,
  moduleTitle,
  level,
  goal,
  lessonContent,
}) => {
  const lessonKey = createLessonKey({
    category,
    moduleTitle,
    level,
    goal,
  });

  const result = await pool.query(
    `
    INSERT INTO lessons
    (
      lesson_key,
      category,
      module_title,
      level,
      goal,
      lesson_content
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    ON CONFLICT (lesson_key)
    DO UPDATE SET
      lesson_content = EXCLUDED.lesson_content,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
    `,
    [
      lessonKey,
      category,
      moduleTitle,
      level,
      goal,
      JSON.stringify(lessonContent),
    ],
  );

  return result.rows[0];
};

module.exports = {
  getArticlesByCategory,
  saveCourse,
  getCourses,
  getCourseById,
  saveLesson,
  getLessonByKey,
};
