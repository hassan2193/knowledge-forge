const { answerQuestion } = require("../services/ragService");

const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const { answer, sources } = await answerQuestion(question);

    return res.json({
      success: true,
      answer,
      sources,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  chat,
};
