require("dotenv").config();

const { generateText } = require("./src/services/aiService");

(async () => {
  try {
    const result = await generateText("Say hello in one sentence.");

    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
