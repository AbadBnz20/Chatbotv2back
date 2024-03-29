const { response } = require("express");
const { message } = require("../helpers/message");
const { toEmbeddings } = require("../helpers/EmbeddingsData");
const { ExtracObjVector } = require("../helpers/ExtracObjDBvector");
const { MongoClient, ObjectId } = require("mongodb");
const { ConfigOPenAI } = require("../helpers/ConfigOpenIA");
const { PromptTemplateBase } = require("../helpers/PrompModel");
const { BufferWindowMemory } = require("langchain/memory");
const {
  MongoDBChatMessageHistory,
} = require("langchain/stores/message/mongodb");
const { ConversationChain } = require("langchain/chains");
const User = require("../models/User");
const { default: Bottleneck } = require("bottleneck");
const linkify = require("linkifyjs");
const { messageFile } = require("../helpers/messagefile");
const client = new MongoClient(process.env.DB_CNN_LANGCHAIN || "");
const collection = client.db("ChatBotDataBase").collection("MemoryChat");
client.connect();

const iniciarChat = async (req, res = response) => {
  try {
    const { Body, WaId, From, ProfileName } = req.body;
    // const { Body, WaId } = req.body;

    // console.log(req.body);
    const user = await User.findOne({ Phone: WaId });
    // console.log(user);
    if (!user) {
      const usuario = new User({
        Name: ProfileName,
        Phone: WaId,
      });
      await message(
        `¡Hola! 😊 ¡Qué gusto verte por aquí! Soy el asistente de *Abordar*, y estoy aquí para hacer que tu búsqueda de lote o terreno sea lo más fácil posible. ¿Cómo puedo ayudarte hoy? Estoy aquí para responder a todas tus preguntas`,
        From
      );
      await usuario.save();
    } else {
      const TextEmbedding = await toEmbeddings(Body);
      const objvector = await ExtracObjVector(TextEmbedding);
      // console.log(objvector);
      const sessionId = !user.MessageID
        ? new ObjectId().toString()
        : user.MessageID;
      if (!user.MessageID) {
        user.MessageID = sessionId;
        await user.save();
      }

      const memory = new BufferWindowMemory({
        k: 4,
        chatHistory: new MongoDBChatMessageHistory({
          collection,
          sessionId,
        }),
      });
      // console.log(objvector);
      const chain = new ConversationChain({
        llm: ConfigOPenAI,
        memory,
        prompt: PromptTemplateBase(objvector),
      });
      // await new Promise(async (resolve, reject) => {
      //   let cad = "";
      //   try {
      //     await chain.call(
      //       { input: Body },
      //       {
      //         callbacks: [
      //           {
      //              handleLLMNewToken: async (token) => {
      //               // console.log(token);
      //               // process.stdout.write(token);
      //               cad += token;
      //               if (token.includes("\n\n")) {
      //                 console.log(cad);

      //                 // message(cad, From);
      //                 cad = "";
      //               }

      //             },
      //           },
      //         ],
      //       }
      //     );
      //     resolve(cad);
      //   } catch (error) {
      //     reject(error);
      //   }
      // })
      // .then((val)=>console.log(val))
      // .catch(() => console.log("error al enviar los mensajes"));

      const limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: 100,
      });

      const type = (text) => {
        return new Promise((resolve) => {
          const url = linkify.find(text);
          const cloudinaryUrlPattern =
            /http:\/\/res\.cloudinary\.com\/[^\s]+/gi;
          url.forEach((item) => {
            if (item.value.match(cloudinaryUrlPattern)) {
              text = text.replace(`(${item.href})`, "");
              messageFile(From, item.href);
            }
          });
          // console.log(text);
          message(text, From);
          resolve();
        });
      };
      const wrappedType = limiter.wrap(type);
      new Promise(async (resolve, reject) => {
        let cad = "";
        try {
          await chain.call(
            { input: Body },
            {
              callbacks: [
                {
                  handleLLMNewToken: async (token) => {
                    cad += token;
                    if (token.includes("\n\n")) {
                      wrappedType(cad);
                      cad = "";
                    }
                  },
                },
              ],
            }
          );
          resolve(cad);
        } catch (error) {
          reject(error);
        }
      })
        .then(async (val) => {
          // console.log(val),
          await wrappedType(val);
        })
        .catch((e) => console.log("error al envia mensaje"));

      // await message(cad, From);
    }
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
    message(`Error ocurrido. Por favor, reenvía el mensaje.`, req.body.From);
    res.status(400).json({
      msg: "Error",
    });
  }
};

module.exports = {
  iniciarChat,
};
