const cloudinary = require("cloudinary").v2;
const uplodadCloudinary = async (file,path) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEYCLOUD,
      api_secret: process.env.APISECRETCLOUD,
    });
    const pdfBase64 = file.data.toString("base64");
    const uploadFile = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${pdfBase64}`,
      { resource_type: "auto", folder: path, public_id: `Image-${file.name}` }
    );
    // console.log("Archivo PDF subido a Cloudinary exitosamente!");

    return uploadFile;
  } catch (error) {
    console.log(error);
    console.log("Error al subir el PDF a Cloudinary");
  }
};

const deleteColoudinaryFile = async (public_id) => {
  // console.log(public_id)
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEYCLOUD,
      api_secret: process.env.APISECRETCLOUD,
    });
    const deletefile = await cloudinary.uploader.destroy(public_id);
    console.log(deletefile);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  uplodadCloudinary,
  deleteColoudinaryFile,
};
