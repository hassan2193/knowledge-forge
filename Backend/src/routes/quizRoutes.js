const express = require("express");

const {
  generateQuiz,
  getSingleQuiz,
} = require("../controllers/quizController");

const router = express.Router();

router.post("/generate", generateQuiz);
router.get("/:id", getSingleQuiz);

module.exports = router;