const routerx = require('express-promise-router');
const progresoController = require('../controllers/ProgresoController');
//const auth = require('../middlewares/auth');
const router=routerx();

router.post('/add', progresoController.add);
router.get('/query',progresoController.query);
router.get('/one', progresoController.one);
router.get('/list', progresoController.list);
router.post('/update', progresoController.update);
module.exports = router;