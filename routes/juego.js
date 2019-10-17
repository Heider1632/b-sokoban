const routerx = require('express-promise-router');
const juegoController = require('../controllers/JuegoController');
const auth = require('../middlewares/auth');

const router=routerx();

router.post('/add',auth.verifyAdministrador, juegoController.add);
router.get('/query',juegoController.query);
router.get('/list', juegoController.list);
router.put('/update', auth.verifyAdministrador, juegoController.update);
router.post('/upload', juegoController.saveJSON)
router.get('/json', juegoController.getJSON)

module.exports = router;