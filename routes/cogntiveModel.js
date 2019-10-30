const routerx = require('express-promise-router');
const cognitiveModelController = require('../controllers/cognitiveModelController');
const auth = require('../middlewares/auth');

const router=routerx();

router.post('/add', cognitiveModelController.add);
router.get('/list', auth.verifyAdministrador, cognitiveModelController.list);

module.exports = router;