const {
  getArticlesByCategory,
  saveLesson,
  getLessonByKey,
} = require("../services/courseService");
const { generateText } = require("../services/aiService");

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

Generate one detailed lesson.

Lesson requirements:
Category: ${category}
Module title: ${moduleTitle}
Module description: ${moduleDescription}
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
  "goal": "string",
  "summary": "string",
  "sections": [
    {
      "title": "string",
      "explanation": "string",
      "keyPoints": ["string", "string"],
      "example": "string"
    }
  ],
  "practiceTask": {
    "title": "string",
    "instructions": "string"
  },
  "interviewQuestions": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}

Rules:
- Generate exactly 3 sections
- Each section must be concise and practical
- Include exactly 2 key points per section
- Include exactly 3 interview questions
- Keep the full lesson useful but not too long
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

module.exports = {
  generateLesson,
};
