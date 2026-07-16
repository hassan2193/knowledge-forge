const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

const extractContent = (html, url) => {
  const dom = new JSDOM(html, { url });

  const reader = new Readability(dom.window.document);

  const article = reader.parse();

  if (!article) {
    return {
      title: "",
      content: "",
    };
  }

  return {
    title: article.title || "",
    content: article.textContent.trim(),
  };
};

module.exports = {
  extractContent,
};
