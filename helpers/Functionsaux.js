const History = require("../models/History");
const { messageFile } = require("./sendmessagefile");

const RegisterMessage = async (body, text, thread) => {
  const obj = [
    { type: "human", data: body },
    { type: "AI", data: text },
  ];
  await History.findOneAndUpdate(
    { ThreadId: thread },
    { $push: { messages: obj } }
  );
};

const ExtractImages = async (text, From) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const regex = /https:\/\/res\.cloudinary\.com\/[^\s)]+/g;
  const matches = text.match(regex);
  if (matches !== null) {
    for (const url of matches) {
      try {
        await messageFile(From, url); 
      } catch (error) {
      }
      await delay(1000); 
    }
  }
};

module.exports = {
  RegisterMessage,
  ExtractImages,
};
