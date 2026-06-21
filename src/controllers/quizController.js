const {
  getArticlesByCategory,
  saveQuiz,
  getQuizByKey,
  getQuizById,
} = require("../services/courseService");
const { generateText } = require("../services/aiService");

const cleanJsonResponse = (text) =>
  text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const generateQuiz = async (req, res) => {
  const startedAt = Date.now();

  try {
    const {
      category,
      lessonTitle,
      level = "beginner",
      goal = "learn the topic clearly",
      refresh = false,
    } = req.body;

    if (!category || !lessonTitle) {
      return res.status(400).json({
        success: false,
        message: "category and moduleTitle are required",
      });
    }

    if (!refresh) {
      const existingQuiz = await getQuizByKey({
        category,
        lessonTitle,
        level,
        goal,
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

    const articles = await getArticlesByCategory(category);

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No articles found",
      });
    }

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
You are an expert technical instructor.

Use this knowledge base only.

Learning material:
${learningMaterial}

Generate a quiz.

Quiz requirements:

Category: ${category}
Lesson title: ${lessonTitle}
Level: ${level}
Goal: ${goal}

Return ONLY valid JSON.
No markdown.
No code fences.
No explanation outside JSON.

JSON structure:
{
  "title": "string",
  "category": "string",
  "level": "string",
  "questions": [
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}

Rules:
- Generate exactly 10 MCQs
- Each question must have exactly 4 options
- Include correctAnswer
- Include explanation
- Keep explanations concise
`;
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

    let quiZ;

    try {
      quiZ = JSON.parse(cleanLesson);
    } catch {
      return res.status(502).json({
        success: false,
        message:
          "AI returned incomplete or invalid JSON. Increase GEMINI_MAX_OUTPUT_TOKENS or reduce lesson size.",
        rawOutput: cleanLesson,
      });
    }

    const savedQuiz = await saveQuiz({
      category,
      lessonTitle,
      level,
      goal,
      quizContent: quiZ,
    });

    return res.json({
      success: true,
      source: "ai",
      quiz: quiZ,
      savedQuizId: savedQuiz.id,
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
