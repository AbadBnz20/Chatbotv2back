const { Pinecone } =require("@pinecone-database/pinecone"); 

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_Environment
  });     
const PineConeIndex = pinecone.Index("chatbotbd");
module.exports={PineConeIndex}