const { message } = require("./sendmessage");
const { messageFile } = require("./sendmessagefile");

const FormatSend = async (text, From) => {
  const regex = /https:\/\/res\.cloudinary\.com\/[^\s)]+/;
  const removeCloudinaryUrls = (text) => {
    const lines = text.split("\n");
    const filteredLines = lines.filter((line) => {
      const match = regex.test(line.trim());
      return !match;
    });
    return filteredLines.join("\n");
  };
  const result = removeCloudinaryUrls(text);
  // console.log(result);
  if (result) {
    message(result, From);
  }
};

module.exports = {
  FormatSend,
};
