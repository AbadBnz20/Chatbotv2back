const express = require('express');
const { RegisterLand, GetLands } = require('../controllers/Land');
const router= express.Router();
router.post('/land',RegisterLand);
router.get('/land',GetLands);
module.exports=router
