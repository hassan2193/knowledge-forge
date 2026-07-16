const {
  getLessonById,
  getQuizByKey,
  getQuizById,
  saveQuiz,
} = require("../services/courseService");

const { buildQuizPrompt } = require("../prompts/quizPrompt");
const { generateText } = require("../services/aiService");

const cleanJsonResponse = (text) =>
  text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const generateQuiz = async (req, res) => {
  const startedAt = Date.now();

  try {
    const { lessonId, refresh = false } = req.body;

    if (!lessonId) {
      return res.status(400).json({
        success: false,
        message: "lessonId is required",
      });
    }

    // Fetch lesson first
    const lesson = await getLessonById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Return existing quiz if already generated
    if (!refresh) {
      const existingQuiz = await getQuizByKey({
        category: lesson.category,
        lessonTitle: lesson.module_title,
        level: lesson.level,
        goal: lesson.goal,
      });

      if (existingQuiz) {
        return res.json({
          success: true,
          source: "database",
          quiz: existingQuiz.quiz_content,
          savedQuizId: existingQuiz.id,
        });
      }
    }

    // Build prompt from lesson
    const prompt = buildQuizPrompt({
      lesson: lesson.lesson_content,
    });

    const aiStartedAt = Date.now();

    const quizText = await generateText(prompt);

    const aiMs = Date.now() - aiStartedAt;

    if (!quizText || !quizText.trim()) {
      return res.status(502).json({
        success: false,
        message: "AI returned empty quiz content",
      });
    }

    const cleanQuiz = cleanJsonResponse(quizText);

    let quiz;

    try {
      quiz = JSON.parse(cleanQuiz);
    } catch {
      return res.status(502).json({
        success: false,
        message: "AI returned invalid quiz JSON",
        rawOutput: cleanQuiz,
      });
    }

    const savedQuiz = await saveQuiz({
      category: lesson.category,
      lessonTitle: lesson.module_title,
      level: lesson.level,
      goal: lesson.goal,
      quizContent: quiz,
    });

    return res.json({
      success: true,
      source: "ai",
      quiz,
      savedQuizId: savedQuiz.id,
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

const getSingleQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await getQuizById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateQuiz,
  getSingleQuiz,
};
