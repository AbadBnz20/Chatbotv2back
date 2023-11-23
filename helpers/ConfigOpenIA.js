
const { Configuration, OpenAIApi,OpenAI } = require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

// const openai = new OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY,
// });

module.exports = { openai };


