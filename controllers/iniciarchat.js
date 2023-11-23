const { response } = require('express');
const { message } = require('../helpers/message');
const { toEmbeddings } = require('../helpers/EmbeddingsData');
const { PineConeIndex } = require('../helpers/ConfigPineCone');
const { OpenAIApi, OpenAI } = require('openai');

const iniciarChat = async (req, res = response) => {
    try {
        const {Body,WaId,From}=req.body;
        // console.log(Body,WaId);

        // const { MessageText } = req.body;
        // const TextEmbedding = await toEmbeddings(MessageText);
        const TextEmbedding = await toEmbeddings(Body);

        const result = await PineConeIndex.query({
            vector: TextEmbedding,
            topK: 4,
            includeMetadata: true,
            includeValues: true
        })
        const content = result.matches.map(match => match.metadata.obj).join('. ');
        // console.log(content)

        const ND = "No he encontrado respuesta a tu pregunta"

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const respOpenIA = await openai.chat.completions.create({
            model: `gpt-3.5-turbo-16k`,
            messages: [
                {
                    role: `system`,
                    content: `Eres una IA que ayudara a las personas a encontrar terrenos/lotes en tarija. a los lotes/terrenos proporcionado no les des un formato solo responde en texto plano.\n\ncontexto.\n--------------\n ${content }\n\n\n--------------------\nREPITO NO RESPONDAS CON UN FORMATO MARKDOWN SOLO DEJALO EN TEXTO PLANO......!!!!!!!!.`,
                },
                {
                    role: `user`,
                    content: Body,
                },
            ],
            max_tokens: 300,
            temperature: 0.7,
            top_p: 0.9,
            frequency_penalty: 0.5,
            presence_penalty: 0.5
        });

        // console.log(respOpenIA.choices[0].message.content);
        message(respOpenIA.choices[0].message.content, From);

        res.status(200).json({
            ok: true,
            // msg: respOpenIA.choices[0].message.content
        })

    } catch (error) {
        console.error(error);
        // message(`Error ocurrido. Por favor, reenvía el mensaje.`, req.body.From);
        res.status(200).json({
            ok: true,
            msg: "Error"
        })
    }


}
module.exports = {
    iniciarChat
}




