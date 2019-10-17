import mongoose, {Schema} from 'mongoose';
const progresoSchema = new Schema({
    Usuario: { type: Schema.Types.ObjectId, ref:"Usuario", required: true },
    Juego: { type: Schema.Types.ObjectId, ref:"Juego", required: true },
    status: { type: Boolean, default: false },
    completed: { type: Boolean, default: false},
	createdAt: { type: Date, default: Date.now }
});

progresoSchema.index({status: 1, status: -1 }) // for next word queries

const Progreso = mongoose.model('progreso',progresoSchema);
export default Progreso;