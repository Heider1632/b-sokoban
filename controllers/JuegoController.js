const models = require('../models');
const fs  = require('fs')
const path  = require('path')

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
            const reg=await models.Juego.find({ nombre: new RegExp(valor, 'i') },{createdAt:0})
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
            const reg = await models.Juego.findByIdAndUpdate({_id:req.body._id},{player:req.body.player,walls: req.body.walls, blocks: req.body.blocks, goals: req.body.goals});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    saveJSON: async (req, res, next) => {
        let { level, steps, user, start, end, duration  } = req.body.json;

        let _dir = path.join(__dirname + `/../public/users/${user._id}/`);

        fs.mkdir(_dir, { recursive: true }, (err) => {
            if (err) console.log("the director exist!");
        });

        let filename = _dir + level +  '.json';

        let data = {
            level,
            steps,
            start,
            end,
            duration
        }

        fs.open(filename, 'wx', function(error, fileDescriptor){        
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

        res.status(200); 
    },
    getJSON : async (req, res, next) => {

        let _dir = path.join(__dirname + `/../public/users/${req.query._id}/`);

        let levels = []

        let files = fs.readdirSync(_dir);
        if(files.length != 0) {
            files.forEach(file => {
                let level = JSON.parse(fs.readFileSync(_dir + file, 'utf-8'))
                if(level){
                    levels.push(level)
                }
            });
        } 

        res.status(200).json(levels);
    }
}
