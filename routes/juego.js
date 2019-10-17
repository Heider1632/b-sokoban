import routerx from 'express-promise-router';
import juegoController from '../controllers/JuegoController';
import auth from '../middlewares/auth';

const router=routerx();

router.post('/add',auth.verifyAdministrador, juegoController.add);
router.get('/query',juegoController.query);
router.get('/list', juegoController.list);
router.put('/update', auth.verifyAdministrador, juegoController.update);
router.post('/upload', juegoController.saveJSON)
router.get('/json', juegoController.getJSON)

export default router;