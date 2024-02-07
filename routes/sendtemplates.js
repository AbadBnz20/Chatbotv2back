const express = require('express');
const { SendTemplate } = require('../controllers/SendTemplates');

const router= express.Router();
router.get('/sendTemplates',SendTemplate);
module.exports=router