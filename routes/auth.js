const express = require('express');
const { Login } = require('../controllers/Auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validardatos');

const router= express.Router();
router.post('/auth',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],Login);

module.exports=router
