const { importDocs } = require("../services/SourceImportService");

const importDocumentation = async (req, res) => {
  try {
    const { source } = req.body;

    if (!source) {
      return res.status(400).json({
        success: false,
        message: "source is required",
      });
    }

    const result = await importDocs(source);

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  importDocumentation,
};
