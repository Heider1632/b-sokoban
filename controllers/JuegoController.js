const models = require('../models');
const fs  = require('fs')

createJsonFile = (path, data) => {
    fs.open(path, 'wx', function(error, fileDescriptor){        
        if(!error && fileDescriptor){        
            let stringData = JSON.stringify(data, null, 2); 
            //console.log(stringData)       
            fs.writeFile(fileDescriptor, stringData, function(error){        
                if(!error){        
                    fs.close(fileDescriptor, function(error){        
                        if(!error){        
                            console.log("done")       
                        }else{        
                            console.log('Error in close file');        
                        }        
                    });        
                }else{        
                    callback('Error in writing file.');        
                }        
            });        
        }  else {
            console.log("error to try writte")
        }      
    })
}

module.exports =  {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Juego.create(req.body);
            if(reg){
                const users = await models.Usuario.find()
                if(users){
                    users.map(async user => {
                        const progress = await models.Progreso.create({
                            Usuario: user._id,
                            Juego: reg._id
                        })

                        await models.Juego.findOneAndUpdate({ _id: progress.Juego }, { $push: { "Progreso": progress._id  } }, {new: true })
                    })
                    res.status(200).json(reg);
                } else {
                    res.status(500).send({
                        message:'Ocurrió un error'
                    });
                    next(e);
                }
            } else{
                res.status(500).send({
                    message:'Ocurrió un error'
                });
                next(e);
            }
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Juego.findOne({_id:req.query._id});
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
            const reg=await models.Juego.find({ nombre: new RegExp(valor, 'i') })
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
            const reg = await models.Juego.findByIdAndUpdate({_id:req.body._id},{player:req.body.player,walls: req.body.walls, blocks: req.body.blocks, goals: req.body.goals});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
