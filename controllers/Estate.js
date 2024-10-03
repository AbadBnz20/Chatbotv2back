const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const { MongoCLientConnect } = require("../Database/ConnectMongo");
const { OpenAIEmbeddings } = require("@langchain/openai");

const RegisterEstate = async (req, res = response) => {
  try {
    const {
      Id,
      Precio,
      Superficie_m2,
      m2_Contruidos,
      Ubicacion,
      Barrio_Zona,
      Papeles,
      Departamento,
      Descripcion,
      Tipo,
      Imagenes,
    } = req.body;
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

    const document = {
      pageContent: `Precio: ${Precio}, Superficie_m2: ${Superficie_m2}, m2_Contruidos: ${m2_Contruidos}, Ubicacion: ${Ubicacion}, Barrio_Zona:${Barrio_Zona}, Papeles:${Papeles},Departamento:${Departamento}, Descripcion:${Descripcion}, Tipo:${Tipo},Imagenes :[${Imagenes.join(
        ", "
      )}] `,
      metadata: { source: "" },
    };

    await vectorStore.addDocuments([document], { ids: [Id] });
    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

module.exports = {
  RegisterEstate,
};
