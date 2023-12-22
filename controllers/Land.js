const { response } = require("express");
const Land = require("../models/Land");
const { uplodadCloudinary } = require("../helpers/SubmitFile");
const {
  EmbeddingsData,
  EmbeddingsDataDelete,
} = require("../helpers/EmbeddingsData");

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

const GetLandById = async (req, res = response) => {
  const { id } = req.params;
  const [land] = await Promise.all([Land.findById(id)]);

  res.json({
    land,
  });
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

const UpdateLand = async (req, res = response) => {
  const { id } = req.params;
  const {
    Precio_cliente,
    Superficie_m2,
    Precio_m2,
    Ubicacion,
    Barrio_Zona,
    Papeles,
    Departamento,
    Servicios_basicos,
  } = req.body;
  try {
    const land = await Land.findByIdAndUpdate(
      id,
      {
        Precio_cliente,
        Superficie_m2,
        Precio_m2,
        Ubicacion,
        Barrio_Zona,
        Papeles,
        Departamento,
        Servicios_basicos,
      },
      { new: true }
    );
    const ObjetLand = {
      id: land._id.toString(),
      content: `Precio Cliente: ${land.Precio_cliente},Superficie M2: ${land.Superficie_m2}, Precio m2: ${land.Precio_m2}, Ubicacion: ${land.Ubicacion}, Barrio/Zona: ${land.Barrio_Zona}, Papeles: ${land.Papeles}, Departamento: ${land.Departamento}, Imagen del terreno: ${land.Imagen_terreno.Url}, Servicios Basicos: ${land.Servicios_basicos}`,
    };
    await EmbeddingsData(ObjetLand);

    if (req.files) {
      const image = await uplodadCloudinary(req.files.file, "LandImage");
      const Imagen_terreno = {
        Url: image.url,
        Public_id: image.public_id,
      };
      const land = await Land.findByIdAndUpdate(
        id,
        {
          Imagen_terreno,
        },
        { new: true }
      );
    }

    res.json({
      resp: "ok",
      land,
    });
  } catch (error) {
    console.log(error);
    res.json({
      resp: "Ha ocurrido un error al procesar la informacion",
    });
  }
};

const DeleteLand = async (req, res = response) => {
  const { id } = req.params;
  try {
    const land = await Land.findByIdAndUpdate(
      id,
      { State: false },
      { new: true }
    );
    await EmbeddingsDataDelete(land._id.toString());
    // console.log(land);

    res.json({
      msg: "El Terreno seleccionado fue eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Ha ocurrido un error al realizar esta operacion",
    });
  }
};

module.exports = {
  RegisterLand,
  GetLands,
  GetLandById,
  UpdateLand,
  DeleteLand,
};
