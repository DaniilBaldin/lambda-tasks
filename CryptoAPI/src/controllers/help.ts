import { RequestHandler } from 'express';
import coinsList from '../utils/coinsList';

const helpMessage: RequestHandler = (req, res) => {
    res.status(200).json({
        commands: {
            '/help': 'See all available commands.',
            '/:market': 'See all coins from selected market',
            '/:market/:short': 'See last price for Coin(where /:market - one of available markets; /:short - one of available coins )',
            '/:market/:short/:timePeriod': 'See price for Coin for chosen time period()',
        },
        info: {
            'Available markets': 'CoinBase, CoinMarketCap, CoinStats, CoinPaprika, Kucoin',
            'Available coins': `${coinsList}`,
            'Available time periods': '30m, 1h, 3h, 6h, 12h, 1d',
        },
    });
};

export default helpMessage;
