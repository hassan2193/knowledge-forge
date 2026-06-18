const {
  getArticlesByCategory,
  saveCourse,
  getCourses,
  getCourseById,
} = require("../services/courseService");
const { generateText } = require("../services/aiService");

const generateCourse = async (req, res) => {
  try {
    const { category } = req.body;

    const articles = await getArticlesByCategory(category);

    if (articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No articles found",
      });
    }

    const titles = articles.map((article) => article.title).join("\n");

    const combinedContent = articles
      .slice(0, 5)
      .map((article) => article.content)
      .join("\n\n");

    const prompt = `
You are an expert curriculum designer.

Available Topics:

${titles}

Learning Material:

${combinedContent}

Generate a complete ${category} course.

Requirements:

- Beginner to Intermediate level
- 8 to 12 modules
- Logical learning order
- Include fundamentals first
- Include practical concepts
- Include module objectives
- Include estimated duration

Return only the course outline.
Keep the response under 500 words.
`;
    const course = await generateText(prompt);

    await saveCourse({
      category,
      courseContent: course,
    });

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
