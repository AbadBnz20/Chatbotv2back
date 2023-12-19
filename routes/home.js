const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validardatos");
const { RegisterHome } = require("../controllers/Home");
const router = express.Router();
router.post(
  "/home",
  [
    check("Precio", "El Precio es obligatorio.").not().isEmpty(),
    check("Superficie_m2", "La Superficie es obligatoria").not().isEmpty(),
    check("m2_Contruidos", "El campo m2 construidos es obligatorio")
      .not()
      .isEmpty(),
    check("Ubicacion", "La Ubicaion es obligatoria").not().isEmpty(),
    check("Barrio_Zona", "La Zona/Barrio es obligatorio").not().isEmpty(),
    check("Papeles", "Los Campo Papeles es obligatorio").not().isEmpty(),
    check("Departamento", "El departamento es obligatorio").not().isEmpty(),
    check("Descripcion", "La Descripcion es obligatorio").not().isEmpty(),
    check("Tipo", "El Tipo es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  RegisterHome
);
// router.get('/home',RegisterHome);
module.exports = router;
