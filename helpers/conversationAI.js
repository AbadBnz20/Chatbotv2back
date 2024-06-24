const { default: Bottleneck } = require("bottleneck");
const { default: OpenAI } = require("openai");
const { message } = require("./sendmessage");
const History = require("../models/History");
const { FormatSend } = require("./formatsend");

const Conversation = async (body, user, From) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const thread = user.MessageID;
    await openai.beta.threads.messages.create(thread, {
      role: "user",
      content: body,
    });

    let cad = "";
    const limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 100,
    });

    const type = (text) => {
      text = text.replace(/【.*?】/g, "");
      // FormatSend(text,From);
      message(text,From);
    };
    const wrappedType = limiter.wrap(type);
    await openai.beta.threads.runs
      .stream(thread, {
        assistant_id: process.env.ASSINTENT_KEY,
      })
      .on("textDelta", async (textDelta, snapshot) => {
        cad += textDelta.value;
        if (textDelta.value.includes("\n\n")) {
          wrappedType(cad);
          cad = "";
        }
      })
      .on("textDone", async (content, snapshot) => {
        const obj = [
          { type: "human", data: body },
          { type: "AI", data: content.value },
        ];
        await History.findOneAndUpdate(
          { ThreadId: thread },
          { $push: { messages: obj } }
        );
      })
      .on("end", () => {
        wrappedType(cad);
      });
  } catch (error) {
    throw new Error("Error al iniciar la conversacion");
  }
};

module.exports = {
  Conversation,
};
