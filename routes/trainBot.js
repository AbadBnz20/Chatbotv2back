const express = require('express');
const { TrainBot } = require('../controllers/TrainBot');
const router= express.Router();
router.post('/train',TrainBot);

module.exports=router
