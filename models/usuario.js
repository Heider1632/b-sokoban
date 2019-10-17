const mongoose  = require('mongoose');
const {Schema}  = require('mongoose');
const usuarioSchema = new Schema({
    rol: { type:String,maxlength:30, default: "jugador" },
    nombre: { type:String,maxlength:50, unique:true, required:true},
    email: { type:String, maxlength:50, unique:true, required:true},
    password: { type:String, maxlength:64, required:true},
    Juego: { type: Schema.Types.ObjectId, ref:"Juego" },
    estado: { type:Number, default:1},
	createdAt: { type: Date, default: Date.now }
});

const Usuario = mongoose.model('usuario',usuarioSchema);
module.exports = Usuario;