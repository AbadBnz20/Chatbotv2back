const { Pinecone } =require("@pinecone-database/pinecone"); 

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    environment: "gcp-starter"
  });     
const PineConeIndex = pinecone.Index("chatbotbd");
module.exports={PineConeIndex}