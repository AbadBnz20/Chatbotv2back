const express = require('express');
const { GetAdministrator, RegisterAdministrator } = require('../controllers/Administrator');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validardatos');

const router= express.Router();

router.get('/administrator',GetAdministrator);
router.post('/administrator',[
    check('Name','El nombre es obligatorio').not().isEmpty(),
    check('Email','El Email es obligatorio').not().isEmpty(),
    check('Password','La Contraseña es obligatorio').not().isEmpty(),
    check('Phone','El Celular es obligatorio').not().isEmpty(),
    check('Gender','El Genero es obligatorio').not().isEmail(),
    validarCampos],RegisterAdministrator);


module.exports=router