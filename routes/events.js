const express = require('express');
const InitChat = require('../controllers/Initchat');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
// obtener eventos
router.post('/init', InitChat)





module.exports = router;