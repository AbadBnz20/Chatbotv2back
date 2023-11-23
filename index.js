const express = require("express");
const session = require('express-session');
const {dbConnection}= require('./Database/Config');
require('dotenv').config();
const cors=require('cors');
const app=express();
app.use(session({
    secret: 'mi-secreto-secreto',
    resave: false,
    saveUninitialized: true
  }));
app.use(cors());
dbConnection();
app.use(express.static('public'));

app.use(express.json());


app.use('/api', require('./routes/chat'));
app.use('/api',require('./routes/land'))
app.use('/api',require('./routes/trainBot'));

app.listen(process.env.PORT, ()=>{
    // console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    console.log(`Tu app esta en http://localhost:${process.env.PORT}`);
})



