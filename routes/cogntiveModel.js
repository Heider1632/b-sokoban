const routerx = require('express-promise-router');
const cognitiveModelController = require('../controllers/JuegoController');
const auth = require('../middlewares/auth');

const router=routerx();

router.post('/add', auth.verifyUsuario, cognitiveModelController.add);
router.get('/list', auth.verifyAdministrador, cognitiveModelController.list);

module.exports = router;