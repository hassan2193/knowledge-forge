const {
  getAllArticles,
  getArticleById,
  searchArticles,
} = require("../services/articleService");

const getArticles = async (req, res) => {
  try {
    const articles = await getAllArticles();

    return res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await getArticleById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    return res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const articles = await searchArticles(q);

    return res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getArticles,
  getArticle,
  search,
};
