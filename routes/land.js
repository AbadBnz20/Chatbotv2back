const express = require("express");
const { RegisterLand, GetLands, UpdateLand, GetLandById, DeleteLand } = require("../controllers/Land");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validardatos");
const router = express.Router();
router.post(
  "/land",
  [
    check("Precio_cliente", "El Precio es obligatorio.").not().isEmpty(),
    check("Superficie_m2", "La Superficie es obligatoria").not().isEmpty(),
    check("Precio_m2", "El precio por m2 es obligatorio").not().isEmpty(),
    check("Ubicacion", "La Ubicaion es obligatoria").not().isEmpty(),
    check("Barrio_Zona", "La Zona/Barrio es obligatorio").not().isEmpty(),
    check("Papeles", "Los Campo Papeles es obligatorio").not().isEmpty(),
    check("Tipo", "Los Tipo Papeles es obligatorio").not().isEmpty(),
    check("Departamento", "El departamento es obligatorio").not().isEmpty(),
    check("Servicios_basicos", "Los servicios basicos son obligatorios")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  RegisterLand
);
router.get("/land", GetLands);
router.get("/land/:id", GetLandById);
router.put(
  "/land/:id",
  [
    check("Precio_cliente", "El Precio es obligatorio.").not().isEmpty(),
    check("Superficie_m2", "La Superficie es obligatoria").not().isEmpty(),
    check("Precio_m2", "El precio por m2 es obligatorio").not().isEmpty(),
    check("Ubicacion", "La Ubicaion es obligatoria").not().isEmpty(),
    check("Barrio_Zona", "La Zona/Barrio es obligatorio").not().isEmpty(),
    check("Papeles", "Los Campo Papeles es obligatorio").not().isEmpty(),
    check("Tipo", "Los Tipo Papeles es obligatorio").not().isEmpty(),
    check("Departamento", "El departamento es obligatorio").not().isEmpty(),
    check("Servicios_basicos", "Los servicios basicos son obligatorios")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  UpdateLand
);
router.delete('/land/:id',DeleteLand);





module.exports = router;
