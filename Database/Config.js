const mongoose = require("mongoose");

const dbConnection = async ()=>{
   
    try {
       await mongoose.connect(process.env.DB_CNN+'/ImnobiliariaBD' ) ;
        console.log("db online");

    } catch (error){
        console.log(error);
        throw new Error("Error a la hora de iniciar BD");
    }
}

module.exports={
    dbConnection
}