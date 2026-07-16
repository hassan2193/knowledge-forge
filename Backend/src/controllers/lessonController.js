const {
  saveLesson,
  getLessonByKey,
  getLessonById,
} = require("../services/courseService");

const { generateText } = require("../services/aiService");

const { generateLessonContext } = require("../services/ragService");
const { buildLessonPrompt } = require("../prompts/lessonPrompt");

const cleanJsonResponse = (text) =>
  text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const generateLesson = async (req, res) => {
  const startedAt = Date.now();

  try {
    const {
      category,
      moduleTitle,
      moduleDescription = "",
      level = "beginner",
      goal = "learn the topic clearly",
      refresh = false,
    } = req.body;

    if (!category || !moduleTitle) {
      return res.status(400).json({
        success: false,
        message: "category and moduleTitle are required",
      });
    }

    if (!refresh) {
      const existingLesson = await getLessonByKey({
        category,
        moduleTitle,
        level,
        goal,
      });

      if (existingLesson) {
        return res.json({
          success: true,
          source: "database",
          cached: false,
          savedLessonId: existingLesson.id,
          content: existingLesson.lesson_content,
          lesson: existingLesson.lesson_content,
          meta: {
            totalMs: Date.now() - startedAt,
          },
        });
      }
    }

    const context = await generateLessonContext(
      category,
      moduleTitle,
      moduleDescription,
      level,
      goal,
    );

    if (!context.trim()) {
      return res.status(404).json({
        success: false,
        message: "No relevant knowledge found",
      });
    }

    const prompt = buildLessonPrompt({
      context,
      category,
      moduleTitle,
      moduleDescription,
      level,
      goal,
    });

    const aiStartedAt = Date.now();
    const lessonText = await generateText(prompt);
    const aiMs = Date.now() - aiStartedAt;

    if (!lessonText || !lessonText.trim()) {
      return res.status(502).json({
        success: false,
        message: "AI returned empty lesson content",
      });
    }

    const cleanLesson = cleanJsonResponse(lessonText);

    let lesson;

    try {
      lesson = JSON.parse(cleanLesson);
    } catch {
      return res.status(502).json({
        success: false,
        message:
          "AI returned incomplete or invalid JSON. Increase GEMINI_MAX_OUTPUT_TOKENS or reduce lesson size.",
        rawOutput: cleanLesson,
      });
    }

    const savedLesson = await saveLesson({
      category,
      moduleTitle,
      level,
      goal,
      lessonContent: lesson,
    });

    return res.json({
      success: true,
      source: "ai",
      cached: false,
      content: lesson,
      lesson,
      savedLessonId: savedLesson.id,
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

const getSingleLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await getLessonById(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    return res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateLesson,
  getSingleLesson,
};
