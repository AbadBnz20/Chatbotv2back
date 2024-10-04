const { MongoCLientConnect } = require("../Database/ConnectMongo");
const { JsonOutputParser } = require("@langchain/core/output_parsers");
const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { ChatOpenAI } = require("@langchain/openai");
const { GetContext } = require("./getContext");
const { BufferWindowMemory } = require("langchain/memory");
const { MongoDBChatMessageHistory } = require("@langchain/mongodb");
const { SendMessage } = require("./Functionsaux");

const Conversation = async (body, user, From) => {
  try {
    const sessionId = user.MessageID;
    const collection = await MongoCLientConnect("histories");
    const memory = new BufferWindowMemory({
      returnMessages: true,
      k: 7,
      chatHistory: new MongoDBChatMessageHistory({
        collection,
        sessionId,
      }),
    });
    const [history, context] = await Promise.all([
      memory.loadMemoryVariables({}),
      GetContext(body),
    ]);

    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
    });

    const formatInstructions = `Respond only in valid JSON. The JSON object you return should match the following schema:
   { response:"string", property:[{ Id: "number",Precio: "string",Superficie_m2: "string",m2_Contruidos: "string",Ubicacion: "string",Barrio_Zona: "string",Papeles: "string",Departamento: "string",Descripcion: "string",Tipo: "string",Imagenes: ["string"]}] }
 
    Where response is a quick and accurate response to the human's question and property are the characteristics of a plot of land/lot/house/home. It is an array of objects, each with an Id, Price, Surface_m2, m2_Built, Location, Neighborhood_Zone, Papers, Apartment, Description, Type, Images (array of URLs).
  
   
    Eres un chatbot de Abordar es una empresa especializada en la comercialización de Lotes o Casas. Si buscan ubicacion de las oficinas esta en la calle Delgadillo y Aleandro del Carpio, estamos disponibles para atenderle en horario de oficina, de 9:00 a.m. a 12:30 p.m. y por las tardes, de 2:30 p.m. a las 6:30 p.m.  Si el humano esta  interesado en adquirir un lote o casa o desean agendar una visita o contactar con un agente proporciona el contacto este contacto: Renato Francachs +591 71193935 
    
    All your property responses will be based on this context: ${context}`;

    // Configura el parser
    const parser = new JsonOutputParser();

    const prompt = await ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an AI assistant. Respond to the user's query using the following context and ensure the response is only in `json` format. Do not include any additional text, explanations, or comments outside the `json` structure. tags\n{format_instructions}",
      ],
      new MessagesPlaceholder("history"),
      ["human", "{query}"],
    ]).partial({
      format_instructions: formatInstructions,
    });

    const chain = prompt.pipe(model).pipe(parser);
    const query = body;
    const resp = await chain.invoke({ query, history: history.history });
    await SendMessage(resp, From);
    await memory.saveContext({ input: body }, { output: resp.response });
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la conversacion");
  }
};

module.exports = {
  Conversation,
};



// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const thread = user.MessageID;
// await openai.beta.threads.messages.create(thread, {
//   role: "user",
//   content: body,
// });
// let cad = "";

// await openai.beta.threads.runs
//   .stream(thread, {
//     assistant_id: process.env.ASSINTENT_KEY,
//   })
//   .on("textDelta", async (textDelta, snapshot) => {
//     cad += textDelta.value;
//     if (textDelta.value.includes("\n\n")) {
//       Formatmessage(cad,From);
//       cad = "";
//     }
//   })
//   .on("textDone", async (content, snapshot) => {
//     await RegisterMessage(body, content.value, thread);
//   })
//   .on("end", async () => {
//     await Formatmessage(cad,From);
//   });
