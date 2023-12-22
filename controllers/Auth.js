const { response } = require("express");
const Administrator=require('../models/Administrator')
const bcryptjs= require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const Login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const administrator = await Administrator.findOne({ Email:email });
    // console.log(usuario._id)
    if (!administrator) {
      return res.status(400).json({
        msg: "Correo o Password no son correctos - correo",
      });
    }

   
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, administrator.Password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o Password no son correctos - password",
      });
    }
    
     // SI el usuario está activo
     if (administrator.State=="PENDING") {
        return res.status(400).json({
          msg: "Su cuenta aun no fue aprobada.",
        });
      }
      else if (administrator.State=="BANNED") {
          return res.status(400).json({
              msg: "No tienes acceso para ingresar al sistema.",
            }); 
      }
    const token = await generarJWT(administrator._id, administrator.rol);
    const user = {
      name: administrator.Name,
      email: administrator.Email,
      img: administrator?.Image,
      rol: administrator.Rol,
      token: token,
    };
    res.json({
      user,
    });
  } catch (error) {
    res.json({
        resp: "Error al iniciar sesion.",
      });
  }

 
};

module.exports = {
  Login,
};
