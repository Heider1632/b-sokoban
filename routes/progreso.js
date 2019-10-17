import routerx from 'express-promise-router';
import progresoController from '../controllers/ProgresoController';
import auth from '../middlewares/auth';
const router=routerx();

router.post('/add', progresoController.add);
router.get('/query',progresoController.query);
router.get('/list', progresoController.list);
router.post('/update', progresoController.update);

export default router;