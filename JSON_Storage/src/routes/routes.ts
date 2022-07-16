import { Router } from 'express';
import { postJson } from '../controllers/postJson';
import { getJson } from '../controllers/getJson';
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json());

router.post('/:route', postJson);
router.get('/:route', getJson);

export default router;
