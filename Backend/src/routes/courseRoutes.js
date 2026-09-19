const express = require("express");

const {
  generateCourse,
  getAllCourses,
  getSingleCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/generate", generateCourse);
router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);

module.exports = router;