const {
  saveCourse,
  getCourses,
  getCourseById,
} = require("../services/courseService");
const { generateText } = require("../services/aiService");
const cache = require("../services/cacheService");

const { generateCourseContext } = require("../services/ragService");
const { buildCoursePrompt } = require("../prompts/coursePrompt");

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

    const context = await generateCourseContext(
      category,
      level,
      duration,
      goal,
    );

    if (!context.trim()) {
      return res.status(404).json({
        success: false,
        message: "No relevant knowledge found",
      });
    }

    const prompt = buildCoursePrompt({
      context,
      category,
      level,
      duration,
      goal,
    });

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
