const models  = require('../models');
module.exports = {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Progreso.create(req.body); 
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Progreso.find({ Usuario: req.query._id, completed: true });
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    one: async (req, res, next) => {
        try {
            const reg=await models.Progreso.find({ _id : req.query._id }).populate({ path: 'Juego', model: 'juego', select: 'nombre' })
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Progreso.find({ Usuario: valor },{createdAt:0}).populate({ path: 'Juego', model: 'juego', select: 'nombre' })
            .sort({'createdAt':1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {           
            const reg = await models.Progreso.findByIdAndUpdate({_id:req.body._id},
            { 
                completed: req.body.completed, 
                steps: req.body.steps,
                start: req.body.start,
                end: req.body.end,
                duration: req.body.duration
            });

            res.status(200).json(reg);
            
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
