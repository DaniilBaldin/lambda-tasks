import { Router } from 'express';
import bodyParser from 'body-parser';

import startMessage from '../controllers/start';
import helpMessage from '../controllers/help';
import findCoinByShort from '../controllers/findByCoinName';
import findAllCoins from '../controllers/findAllCoinsByMarket';
import findPriceByTime from '../controllers/coinPriceByTimePeriod';

const router = Router();

router.get('/', startMessage);
router.get('/help', helpMessage);
router.get('/:market/', findAllCoins);
router.get('/:market/:short', findCoinByShort);
router.get('/:market/:short/:timePeriod', findPriceByTime);

router.use(bodyParser.json());
export default router;
