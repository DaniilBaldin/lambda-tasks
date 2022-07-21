import cron from 'node-cron';
import CoinMarketCap from '../controllers/endpoints/coinMarketCap';
import CoinBase from '../controllers/endpoints/coinBase';
import CoinStats from '../controllers/endpoints/coinStats';
import kuCoin from '../controllers/endpoints/kucoin';
import coinPaprika from '../controllers/endpoints/coinPaprika';

const getEndpoints = () => {
    const task = cron.schedule('*/5 * * * *', () => {
        try {
            CoinBase();
            CoinMarketCap();
            coinPaprika();
            CoinStats();
            kuCoin();
            console.log(`Saved! ${new Date().toLocaleTimeString()}`);
        } catch (err) {
            console.log((err as Error).message);
        }
    });
    task.start();
};

export default getEndpoints;
