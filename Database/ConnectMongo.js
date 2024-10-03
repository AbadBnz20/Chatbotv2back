const { MongoClient } = require("mongodb");

const MongoCLientConnect = async (collectionName='Estate') => {
  try {
    const client = new MongoClient(process.env.DB_CNN || "");
    const collection = client.db('ImnobiliariaBD').collection(collectionName);
    return collection;
  } catch (error) {
    throw new Error("Error al conectarse con BD");
  }
};

module.exports = {
  MongoCLientConnect,
};
