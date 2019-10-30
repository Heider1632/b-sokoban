const routerx = require('express-promise-router');
const usuarioRouter = require('./usuario');
const progresoRouter = require( './progreso');
const juegoRouter  = require('./juego')
const cognitiveModelRouter = require("./cogntiveModel")
const router=routerx();

router.use('/usuario',usuarioRouter);
router.use('/progreso',progresoRouter);
router.use('/juego',juegoRouter);
router.use('/cognitiveModel', cognitiveModelRouter)
module.exports = router;