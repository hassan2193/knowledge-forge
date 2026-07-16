const iconv = require("iconv-lite");

const decodeHtml = (buffer) => {
  return iconv.decode(buffer, "utf8");
};

module.exports = {
  decodeHtml,
};
