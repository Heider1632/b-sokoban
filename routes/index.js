import routerx from 'express-promise-router';
import usuarioRouter from './usuario';
import progresoRouter from './progreso'
import juegoRouter from './juego'
const router=routerx();


router.use('/usuario',usuarioRouter);
router.use('/progreso',progresoRouter);
router.use('/juego',juegoRouter);
export default router;