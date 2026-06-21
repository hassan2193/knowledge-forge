const express = require("express");

const router = express.Router();

const { getHtml } = require("../controllers/getHtmlController");
const {
  getArticles,
  getArticle,
  search,
} = require("../controllers/articleController");
const rateLimiter = require("../middleware/rateLimiter");
const { generateText } = require("../services/aiService");
const {
  generateCourse,
  getAllCourses,
  getSingleCourse,
} = require("../controllers/courseController");
const { generateLesson } = require("../controllers/lessonController");
const { generateQuiz } = require("../controllers/quizController");

router.get("/gethtml", rateLimiter, getHtml);
router.get("/articles", getArticles);
router.get("/articles/:id", getArticle);
router.get("/search", search);
router.post("/generate-lesson", generateLesson);
router.post("/generate-quiz", generateQuiz);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getSingleCourse);
router.post("/generate-course", generateCourse);

router.get("/test-ai", async (req, res) => {
  try {
    const text = await generateText("Explain Node.js in 5 lines");

    res.json({
      success: true,
      text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
