const isValidDocumentationFile = (url) => {
  return !/\.(pdf|png|jpg|jpeg|gif|svg|xml|zip|tar|gz)$/i.test(url);
};

module.exports = {
  isValidDocumentationFile,
};
