const { response } = require('express');
const Land = require('../models/Land');
const RegisterLand = async (req, res = response) => {
    const { terrenos } = req.body;
    try {
        await Promise.all(
            terrenos.map(async index => {
                const land = new Land(index);
                await land.save();
            })
        );
        res.json({
            resp: "ok",
        })
    } catch (error) {
        res.status(400).json({
            resp: "ok",
            msg: "Error al ejecutar esta accion"

        })
    }
}

const GetLands = async (req, res = response) => {
    try {
        const [lands] = await Promise.all([
            Land.find()

        ]);
        res.json({
            resp: "ok",
            lands
        })
    } catch (error) {
        res.status(400).json({
            resp: "ok",
            msg: "Error al ejecutar esta accion"
        })
    }
}

module.exports = {
    RegisterLand,
    GetLands
}