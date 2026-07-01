const { crawlWebsite } = require("../services/crawlerService");

const crawl = async (req, res) => {
  try {
    const { source } = req.body;

    if (!source) {
      return res.status(400).json({
        success: false,
        message: "source is required",
      });
    }

    const urls = await crawlWebsite(source);

    return res.json({
      success: true,
      totalUrls: urls.length,
      urls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  crawl,
};
