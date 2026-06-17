require("dotenv").config();

const seedUrls = require("./src/data/seedUrls");

const { fetchHtml } = require("./src/services/fetchService");
const { extractContent } = require("./src/services/extractionService");
const { saveContent } = require("./src/services/contentService");
const { getSource } = require("./src/utils/getSource");

(async () => {
  try {
    for (const item of seedUrls) {
      try {
        console.log(`Processing: ${item.url}`);

        const response = await fetchHtml(item.url);

        const html = response.data.toString();

        const article = extractContent(html, item.url);

        await saveContent({
          url: item.url,
          source: getSource(item.url),
          title: article.title,
          content: article.content,
          contentLength: article.content.length,
          category: item.category,
          contentType: item.contentType,
          render: false,
        });

        console.log(`Saved: ${article.title}`);
      } catch (error) {
        console.log(`Failed: ${item.url}`);
        console.log(error.message);
      }
    }

    console.log("Knowledge Base Seeded Successfully");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
