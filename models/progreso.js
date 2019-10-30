const mongoose  = require('mongoose');
const {Schema}  = require('mongoose');
const progresoSchema = new Schema({
    Usuario: { type: Schema.Types.ObjectId, ref:"Usuario", required: true },
    Juego: { type: Schema.Types.ObjectId, ref:"Juego", required: true },
    status: { type: Boolean, default: true },
    completed: { type: Boolean, default: false},
    start: { type: Date },
    end: {type: Date },
    steps: { type: [], default: [] },
    duration : { type: String },
	createdAt: { type: Date, default: Date.now }
});

progresoSchema.index({status: 1, status: -1 }) // for next word queries

const Progreso = mongoose.model('progreso',progresoSchema);
module.exports = Progreso;