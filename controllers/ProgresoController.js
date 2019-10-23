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
            const reg=await models.Progreso.findOne({_id:req.query._id});
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
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Progreso.find({ Usuario: valor },{createdAt:0}).populate({ path: 'Juego', model: 'juego', select: 'nombre' })
            .sort({'createdAt':-1});
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
            const reg = await models.Progreso.findByIdAndUpdate({_id:req.body._id},{completed: req.body.completed});

            if (reg) {
                const change = await models.Progreso.find({ completed: true, status: false })
                if(change.length != 0){
                    const changed = await models.Progreso.findByIdAndUpdate({ _id : changed[0]._id },  { $set: { status: true } })
                }
                res.status(200).json(reg);
            } else {
                res.status(500).send({
                    message:'Ocurrió un error'
                });
                next(e);
            }
            
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    changeStatus: async (req, res, next) => {
        try {               
            const reg = await models.Progreso.findByIdAndUpdate({_id:req.body._id, completed: false },{status: true });

            res.status(200).json(reg);

            
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
