const { response } = require("express");
const Company= require('../models/Company');
const { EmbeddingsData } = require("../helpers/EmbeddingsData");


const RegisterInformation =  async(req,res=response)=>{
    const {information}= req.body;
    const company= new Company({InformationGeneral:information});
    const ObjetLand = {
        id: company._id.toString(),
        content: `${company.InformationGeneral}`,
      };
      console.log(company);
         await EmbeddingsData(ObjetLand);
    await company.save();
    res.json({
        resp:"ok"
    })
}

module.exports={
    RegisterInformation
}