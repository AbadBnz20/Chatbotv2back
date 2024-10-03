const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require("./Database/Config");
// crear el servidor de express
const app = express();
dbConnection();
// CORS
app.use(cors());
// directorio Publico
app.use(express.static('public'))
//lectura y parseo del body
app.use(express.json());
//Rutas
app.use('/api', require('./routes/events'));
app.use('/api', require('./routes/estate'));

//Crud :eventos

// escuchar la peticion
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});