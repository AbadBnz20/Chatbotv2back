// const { openai } = require('./ConfigOpenIA');
const { PineConeIndex } = require('./ConfigPineCone');
const OpenAIApi = require('openai');
const EmbeddingsData = async (data) => {


    await Promise.all(
        data.map(async item => {
            const embeddingResponse = await toEmbeddings(item.content);
            const obj = item.content;
            const objectToSave = {
                id: item.id + '',
                metadata: {
                    obj,
                },
                values: embeddingResponse
            }
            await PineConeIndex.upsert([objectToSave]);

        })
    );


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