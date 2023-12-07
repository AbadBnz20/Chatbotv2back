const { OpenAIChat } = require("langchain/llms/openai");

const ConfigOPenAI = new OpenAIChat({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    maxTokens: 750,
    streaming: true,
});

module.exports={ConfigOPenAI}


