const getSource = (url) => {
  return new URL(url).hostname;
};

module.exports = {
  getSource,
};
