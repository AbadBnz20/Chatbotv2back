const { response } = require("express");
const Land = require("../models/Land");
const { uplodadCloudinary } = require("../helpers/SubmitFile");
const { EmbeddingsData } = require("../helpers/EmbeddingsData");

const GetLands = async (req, res = response) => {
  try {
    const [lands] = await Promise.all([Land.find()]);
    res.json({
      resp: "ok",
      lands,
    });
  } catch (error) {
    res.status(400).json({
      resp: "ok",
      msg: "Error al ejecutar esta accion",
    });
  }
};

const RegisterLand = async (req, res = response) => {
  const {
    Precio_cliente,
    Superficie_m2,
    Precio_m2,
    Ubicacion,
    Barrio_Zona,
    Papeles,
    Departamento,
    Imagen_terreno,
    Servicios_basicos,
  } = req.body;
  try {
    if (!req.files) {
      res.status(400).json({
        resp: "No se ha proporcionado una imagen",
      });
    }
    const image = await uplodadCloudinary(req.files.file, "LandImage");

    const land = new Land({
      Precio_cliente,
      Superficie_m2,
      Precio_m2,
      Ubicacion,
      Barrio_Zona,
      Papeles,
      Departamento,
      Imagen_terreno,
      Servicios_basicos,
    });

    land.Imagen_terreno.Url = image.url;
    land.Imagen_terreno.Public_id = image.public_id;

    // console.log(land);
    await land.save();

    const ObjetLand = {
      id: land._id.toString(),
      content: `Precio Cliente: ${land.Precio_cliente},Superficie M2: ${land.Superficie_m2}, Precio m2: ${land.Precio_m2}, Ubicacion: ${land.Ubicacion}, Barrio/Zona: ${land.Barrio_Zona}, Papeles: ${land.Papeles}, Departamento: ${land.Departamento}, Imagen del terreno: ${land.Imagen_terreno.Url}, Servicios Basicos: ${land.Servicios_basicos}`,
    };
       await EmbeddingsData(ObjetLand);


    res.json({
      resp: "ok",
      land,
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      resp: "ok",
      msg: "Error Error al registrar el Terreno.",
    });
  }
};

module.exports = {
  RegisterLand,
  GetLands,
};
