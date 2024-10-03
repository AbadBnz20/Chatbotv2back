const express = require('express');
const { RegisterEstate } = require('../controllers/Estate');
const router = express.Router();
router.post('/estate', RegisterEstate)





module.exports = router;