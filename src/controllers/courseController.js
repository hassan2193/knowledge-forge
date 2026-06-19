const {
  getArticlesByCategory,
  saveCourse,
  getCourses,
  getCourseById,
} = require("../services/courseService");
const { generateText } = require("../services/aiService");
const cache = require("../services/cacheService");

const generateCourse = async (req, res) => {
  const startedAt = Date.now();

  try {
    const {
      category,
      level = "beginner",
      duration = "2 weeks",
      goal = "learn the topic clearly",
      refresh = false,
    } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const articleLimit = Number(process.env.COURSE_ARTICLE_LIMIT) || 3;
    const contentCharLimit =
      Number(process.env.COURSE_CONTENT_CHAR_LIMIT) || 1800;

    const cacheKey = `course:v2:${category}:${level}:${duration}:${goal}`;

    if (!refresh && cache.has(cacheKey)) {
      const cachedCourse = cache.get(cacheKey);

      return res.json({
        success: true,
        cached: true,
        content: cachedCourse,
        course: cachedCourse,
        meta: {
          totalMs: Date.now() - startedAt,
        },
      });
    }

    const articles = await getArticlesByCategory(category, {
      articleLimit,
      contentCharLimit,
    });

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No articles found",
      });
    }

    const titles = articles
      .map((article, index) => `${index + 1}. ${article.title}`)
      .join("\n");

    const learningMaterial = articles
      .map((article, index) => {
        return `
Source ${index + 1}
Title: ${article.title}
Source: ${article.source}
Content:
${article.content}
`;
      })
      .join("\n---\n");

    const prompt = `
You are an expert curriculum designer.

Use this knowledge base only.

Topics:
${titles}

Learning material:
${learningMaterial}

Generate a ${category} course.

Course requirements:
Level: ${level}
Duration: ${duration}
Goal: ${goal}

Return ONLY valid JSON.
No markdown.
No code fences.
No explanation outside JSON.

JSON structure:
{
  "title": "string",
  "level": "string",
  "duration": "string",
  "goal": "string",
  "modules": [
    {
      "title": "string",
      "description": "string",
      "objectives": ["string", "string"],
      "estimatedTime": "string"
    }
  ]
}

Rules:
- Generate exactly 5 modules
- Each module must include a short description
- Each module must include exactly 2 objectives
- Do not include lessons
- Keep response concise
`;

    const aiStartedAt = Date.now();
    const courseText = await generateText(prompt);
    const aiMs = Date.now() - aiStartedAt;

    if (!courseText || !courseText.trim()) {
      return res.status(502).json({
        success: false,
        message: "AI returned empty course content",
      });
    }

    const cleanCourse = courseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let course;

    try {
      course = JSON.parse(cleanCourse);
    } catch {
      return res.status(502).json({
        success: false,
        message:
          "AI returned incomplete or invalid JSON. Increase GEMINI_MAX_OUTPUT_TOKENS or reduce module count.",
        rawOutput: cleanCourse,
      });
    }

    cache.set(cacheKey, course);

    await saveCourse({
      category,
      courseContent: JSON.stringify(course),
    });

    return res.json({
      success: true,
      cached: false,
      content: course,
      course,
      meta: {
        articleCount: articles.length,
        promptChars: prompt.length,
        aiMs,
        totalMs: Date.now() - startedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await getCourses();

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateCourse,
  getAllCourses,
  getSingleCourse,
};
