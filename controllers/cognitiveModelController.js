const models = require('../models');

module.exports =  {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Juego.create(req.body);
            res.status(200).json(reg);

        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.CognitiveModel.find({ nombre: new RegExp(valor, 'i') })
            .sort({'createdAt':-1});

            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
