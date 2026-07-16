const axios = require("axios");

const fetchHtml = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: Number(process.env.REQUEST_TIMEOUT) || 10000,
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  return response;
};

module.exports = {
  fetchHtml,
};
