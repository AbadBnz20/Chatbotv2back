const { response } = require('express');
const { message } = require('../helpers/message');

const iniciarChat = async (req, res = response) => {
    try {
        
        console.log(req.body);
    } catch (error) {
        console.error(error);
        message(`Error ocurrido. Por favor, reenvía el mensaje.`, req.body.From);
       
    }
    res.status(200).json({
        ok: true,
    })

}
module.exports = {
    iniciarChat
}




