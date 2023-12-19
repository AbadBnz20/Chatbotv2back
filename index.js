const express = require("express");
const session = require('express-session');
const {dbConnection}= require('./Database/Config');
require('dotenv').config();
const cors=require('cors');
const fileUpload = require("express-fileupload");
const app=express();
app.use(session({
    secret: 'mi-secreto-secreto',
    resave: false,
    saveUninitialized: true
  }));
dbConnection();
app.use(fileUpload()); 
app.use(cors());


app.use(express.static('public'));
app.use(express.json());
  


app.use('/api', require('./routes/chat'));
app.use('/api',require('./routes/land'))
app.use('/api',require('./routes/trainBot'));
app.use('/api',require('./routes/administrator'));
app.use('/api',require('./routes/auth'));
app.use('/api',require('./routes/information'));
app.use('/api',require('./routes/home'));




app.listen(process.env.PORT, ()=>{
    // console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    console.log(`Tu app esta en http://localhost:${process.env.PORT}`);
})



