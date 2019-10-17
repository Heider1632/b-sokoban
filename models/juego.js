import mongoose, {Schema} from 'mongoose';
const juegoSchema = new Schema({
    player: { type: Object, required: true },
    blocks: { type: Array, required: true },
    walls: { type: Array, required: true },
    goals: { type: Array, required: true },
    Progreso: [{ type: Schema.Types.ObjectId, ref:"Progreso", required: true }],
    createdAt: { type: Date, default: Date.now },
    nombre: { type: String, required: true }
});

const Juego = mongoose.model('juego',juegoSchema);
export default Juego;