const routerx = require('express-promise-router');
const usuarioRouter = require('./usuario');
const progresoRouter = require( './progreso');
const juegoRouter  = require('./juego')
const router=routerx();

console.log(usuarioRouter)


router.use('/usuario',usuarioRouter);
router.use('/progreso',progresoRouter);
router.use('/juego',juegoRouter);
module.exports = router;