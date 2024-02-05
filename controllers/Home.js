const { response } = require("express");
const { uplodadCloudinary } = require("../helpers/SubmitFile");
const Home = require("../models/Home");
const {
  EmbeddingsData,
  EmbeddingsDataDelete,
} = require("../helpers/EmbeddingsData");

const RegisterHome = async (req, res = response) => {
  const {
    Precio,
    Superficie_m2,
    m2_Contruidos,
    Ubicacion,
    Barrio_Zona,
    Papeles,
    Departamento,
    Descripcion,
    Tipo,
  } = req.body;
  try {
    if (!req.files) {
      res.status(400).json({
        resp: "No se ha proporcionado una imagen",
      });
    }
    const image = await uplodadCloudinary(req.files.file, "HomeImage");
    const home = new Home({
      Precio,
      Superficie_m2,
      m2_Contruidos,
      Ubicacion,
      Barrio_Zona,
      Papeles,
      Departamento,
      Descripcion,
      Tipo,
    });
    home.Imagen_Casa.Url = image.url;
    home.Imagen_Casa.Public_id = image.public_id;
    await home.save();
    console.log("asfas");
    const ObjetHome = {
      id: home._id.toString(),
      content: `Tipo:${home.Tipo},Precio:${home.Precio},Superficie_M2:${home.Superficie_m2},M2_Contruidos:${home.m2_Contruidos}, Ubicacion: ${home.Ubicacion}, Barrio/Zona: ${home.Barrio_Zona}, Papeles: ${home.Papeles}, Departamento: ${home.Departamento}, Imagen del terreno: ${home.Imagen_Casa.Url},Descripcion: ${home.Descripcion}`,
    };

    await EmbeddingsData(ObjetHome);
    res.json({
      resp: "ok",
      home,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      resp: "ok",
      msg: "Error al registrar el Terreno.",
    });
  }
};

const DeleteHome = async (req, res = response) => {
  const { id } = req.params;
  try {
    const home = await Home.findByIdAndUpdate(
      id,
      { State: false },
      { new: true }
    );
    await EmbeddingsDataDelete(home._id.toString());
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
  RegisterHome,
  DeleteHome,
};
