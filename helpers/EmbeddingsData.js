// const { openai } = require('./ConfigOpenIA');
const { PineConeIndex } = require('./ConfigPineCone');
const OpenAIApi = require('openai');
const EmbeddingsData = async (data) => {
   
    const embeddingResponse = await toEmbeddings(data.content);
    const obj = data.content;
    const objectToSave = {
        id: data.id + '',
        metadata: {
            obj,
        },
        values: embeddingResponse
    }
    await PineConeIndex.upsert([objectToSave]);
   
}

const toEmbeddings = async (text) => {
    const openai = new OpenAIApi({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
    const response = await openai.embeddings.create({
        input: [`${text}`],
        model: "text-embedding-ada-002",
    });
    
    return response.data[0].embedding
}

module.exports = {
    EmbeddingsData,
    toEmbeddings
}