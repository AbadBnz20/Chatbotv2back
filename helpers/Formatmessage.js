const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { ChatOpenAI } = require("@langchain/openai");
const { JsonOutputFunctionsParser } = require("langchain/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { messageFile } = require("./sendmessagefile");
const { message } = require("./sendmessage");

const schema = z.object({
  title: z.string().describe("Titulo de la propiedad"),
  price: z.string().describe("precio del articulo"),
  surface: z.string().describe("Superficie del articulo"),
  m2_built: z.string().describe("Metros construidos del articulo"),
  location: z.string().describe("Ubicacion del articulo"),
  zone: z.string().describe("Barrio/zona del articulo"),
  papers: z.string().describe("Estado de los papeles del articulo"),
  department: z.string().describe("Departamento del articulo"),
  description: z.string().describe("Descripcion del articulo"),
  type: z
    .string()
    .describe("Tipo si es casa/vivienda o condominio o lotes o terreno"),
  images: z.array(z.string().describe("Urls de las imagenes del articulo")),
  response: z
    .string()
    .describe(
      "If the text provided has these data (title, price, surface, location, area/neighborhood, papers and apartment or contains image urls) you will return null or ' '. If the text provided does not have any of the data named above then you will return the same text but if it has image or video urls you will also return null"
    ),
});

const Formatmessage = async (cad, From) => {
  console.log(cad)
  try {
    const modelParams = {
      functions: [
        {
          name: "format",
          description: "de markdown a json",
          parameters: zodToJsonSchema(schema),
        },
      ],
      function_call: { name: "format" },
    };

    const prompt = ChatPromptTemplate.fromTemplate(
      `convierte a formato json este texto : {input}`
    );
    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
    }).bind(modelParams);

    const chain = prompt
      .pipe(model)
      .pipe(new JsonOutputFunctionsParser({ diff: true }));

    const resp = await chain.invoke({
      input: cad,
    });
    SendMessage(resp, From);
  } catch (error) {
    throw new Error("Error al enviar los mensajes");
  }
};

const SendMessage = async (obj, from) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  if (obj.response.trim() === "") {
    const cad = `${obj.title},
         Precio:${obj.price},
         Superficie: ${obj.surface},
         m² Construidos:${obj.m2_built},
         Ubicacion:${obj.location},
         Zona/Barrio: ${obj.zone},
         Papeles: ${obj.papers},
         Departamento:${obj.department},
         Descripción:${obj.description},
         Tipo:${obj.type},`;
    await message(cad, from);
    if (obj.images.length > 0) {
      for (const url of obj.images) {
        await messageFile(from, url);
        await delay(1000);
      }
    }
  } else {
    await message(obj.response, from);
    if (obj.images.length > 0) {
      for (const url of obj.images) {
        await messageFile(from, url);
        await delay(1000);
      }
    }
  }
};

module.exports = Formatmessage;
