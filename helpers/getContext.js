const { OpenAIEmbeddings } = require("@langchain/openai");
const { MongoCLientConnect } = require("../Database/ConnectMongo");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");

const GetContext = async (query) => {
  try {
    const collection = await MongoCLientConnect();
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: collection,
      indexName: "estate_index", // The name of the Atlas search index. Defaults to "default"
      textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
      embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    });

    const similaritySearchResults = await vectorStore.similaritySearch(
      query,
      3
    );
    const context = similaritySearchResults.map(item => item.pageContent).join('| ');

    return context;

  } catch (error) {}
};



module.exports={
    GetContext
}