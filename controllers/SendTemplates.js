const { response } = require("express")
const {messageTemplate}= require('../helpers/messageTemplate')

const SendTemplate = async (req, res=response)=>{
        await messageTemplate();
    res.json({
        ok:true
    })
}
module.exports={
    SendTemplate
}