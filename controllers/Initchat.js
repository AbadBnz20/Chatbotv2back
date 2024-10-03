const { response } = require("express");
const { default: OpenAI } = require("openai");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const { message } = require("../helpers/sendmessage");
const { Conversation } = require("../helpers/conversationAI");
const History = require("../models/History");
const InitChat = async (req, res = response) => {
  const { ProfileName, WaId, From, Body } = req.body;
   try {
    let user = await User.findOne({ Phone: WaId });
    if (!user) {
      const conversation =  new ObjectId().toString();
      user = new User({
        Name: ProfileName,
        Phone: WaId,
        MessageID:conversation
      });
      await Promise.all([
         message(
          `¡Hola! 😊 ¡Qué gusto verte por aquí! Soy el asistente de *Abordar*, y estoy aquí para hacer que tu búsqueda de lote o terreno sea lo más fácil posible. ¿Cómo puedo ayudarte hoy?`,
          From
        ),
        user.save(),
       
      ]);
    } else {
      await Conversation(Body,user,From);
    }
    
  
  } catch (error) {
    console.log(error);
    await message(
      `⚠ Ha ocurrido un error al procesar tu mensaje. Intenta enviar el mensaje nuevamente o intentalo mas tarde`,
      From
    )
  }
  res.json({
    status: "success",
  });
};

module.exports = InitChat;
