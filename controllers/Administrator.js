const { response } = require("express");
const Administrator = require("../models/Administrator");
const { uplodadCloudinary } = require("../helpers/SubmitFile");
const bcryptjs=require('bcryptjs');
const GetAdministrator = async (req, res = response) => {
  const [administrator] = await Promise.all([Administrator.find()]);

  res.json({
    resp: "ok",
    administrator,
  });
};

const RegisterAdministrator = async (req, res = response) => {
  const { Name, Email, Password, Phone, Gender } = req.body;

  try {
    let image={};
    if (req.files) {
       image = await uplodadCloudinary(
        req.files.file,
        "UserAdministrator"
      );
    }
    const administrator = new Administrator({
      Name,
      Email,
      Password,
      Phone,
      Gender,
    });
    const salt = bcryptjs.genSaltSync();
    administrator.Password = bcryptjs.hashSync(Password, salt);
    administrator.Image=image.url;
    await administrator.save();
    res.json({
      resp: "ok",
      administrator,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      resp: "Error al registrar al usuario",
    });
  }
};

module.exports = {
  GetAdministrator,
  RegisterAdministrator,
};
