const History = require("../models/History");
const { message } = require("./sendmessage");
const { messageFile } = require("./sendmessagefile");

const SendMessage = async (obj, From) => {
  await message(obj.response, From);
  if (obj.property.length > 0) {
    for (const i of obj.property) {
      const cad = `✅ *Precio*: ${i.Precio},
     ✅ *Superficie m²*: ${i.Superficie_m2},
     ✅ *m² Contruidos*: ${i.m2_Contruidos},
     ✅ *Ubicación*: ${i.Ubicacion},
     ✅ *Barrio/Zona*: ${i.Barrio_Zona},
     ✅ *Papeles*: ${i.Papeles},
     ✅ *Departamento*: ${i.Departamento},
     ✅ *Descripción*: ${i.Descripcion}
     ✅ *Tipo*: ${i.Tipo}`;
      await message(cad, From);
      if (i.Imagenes.length > 0) {
        await SendImages(i.Imagenes, From);
      }
    }
  }
};

const SendImages = async (urls, From) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const url of urls) {
    await messageFile(From, url);
    await delay(1000);
  }
};




// const limiter = new Bottleneck({
//   maxConcurrent: 1,
//   minTime: 100,
// });

// const type = (text) => {
//   text = text.replace(/【.*?】/g, "");
//   FormatSend(text, From);
//   // message(text,From);
// };
// const wrappedType = limiter.wrap(type);

module.exports = {
  SendMessage,
  SendImages,
};
