const express = require('express');
const bodyParser = require('body-parser');
const {iniciarChat}=require('../controllers/iniciarchat');
const router= express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.post('/new',iniciarChat);
module.exports=router