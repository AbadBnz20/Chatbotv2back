const express= require('express');
const { RegisterInformation } = require('../controllers/Information');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validardatos');

const router=express.Router();
router.post('/information',
[
    check('information',"El campo information es requerido").not().isEmpty(),
    validarCampos
],RegisterInformation);


module.exports=router