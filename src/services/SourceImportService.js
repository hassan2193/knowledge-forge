const { crawlWebsite } = require("./crawlerService");
const { fetchHtml } = require("./fetchService");
const { decodeHtml } = require("./decodeService");
const { extractContent } = require("./extractionService");
const { saveContent, getAllUrls } = require("./contentService");
const { getSource } = require("../utils/getSource");

const importDocs = async (source) => {
  const urls = await crawlWebsite(source);

  const existingUrls = new Set(await getAllUrls());

  let saved = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    if (existingUrls.has(url)) {
      skipped++;

      console.log(`[${i + 1}/${urls.length}] Skipped: ${url}`);

      continue;
    }

    try {
      console.log(`[${i + 1}/${urls.length}] Processing: ${url}`);

      const response = await fetchHtml(url);

      const html = decodeHtml(response.data);

      const article = extractContent(html, url);

      if (!article.content) {
        failed++;

        console.log(`[${i + 1}/${urls.length}] No content`);

        continue;
      }

      await saveContent({
        url,
        source: getSource(url),
        title: article.title,
        content: article.content,
        contentLength: article.content.length,
        render: false,
      });

      existingUrls.add(url);

      saved++;

      console.log(`[${i + 1}/${urls.length}] Saved`);
    } catch (error) {
      if (error.response?.status === 404) {
        skipped++;

        console.log(`[${i + 1}/${urls.length}] Skipped (404): ${url}`);

        continue;
      }

      failed++;

      console.log(`[${i + 1}/${urls.length}] Failed: ${error.message}`);
    }
  }

  return {
    totalUrls: urls.length,
    saved,
    skipped,
    failed,
  };
};

module.exports = {
  importDocs,
};
