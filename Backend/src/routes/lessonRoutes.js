const express = require("express");

const {
  generateLesson,
  getSingleLesson,
} = require("../controllers/lessonController");

const router = express.Router();

router.post("/generate", generateLesson);
router.get("/:id", getSingleLesson);

module.exports = router;