const { response } = require('express');
const { TrainbotData } = require('../helpers/TrainBotData');
const { EmbeddingsData } = require('../helpers/EmbeddingsData');


const TrainBot = async (req, res = response) => {
   
    const result = await TrainbotData();
    
   const Embeddings = await EmbeddingsData(result);
    res.status(200).json({
        ok: true,
        msg:'correctamente'
    })

}
module.exports = {
    TrainBot
}
