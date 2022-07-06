const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const deadlineCalc = require('../controllers/deadlineCalc');
const costCalc = require('../controllers/costCalc');

router.use(bodyParser.json({ extended: true }));

router.use((req, res, next) => {
    const reqBody = req.body;
    const date = new Date();
    let price = costCalc(reqBody);
    let time = deadlineCalc(reqBody);
    let deadlineTime = Math.round(date.getHours() + time);

    switch (typeof time) {
        case 'string':
            res.json({
                price: price,
                'time to deadline': time,
            });
        default:
            res.json({
                price: price,
                time: `${time} hours.`,
                'deadline date': `${date.toDateString()} at ${deadlineTime} hours.`,
            });
    }
});

module.exports = router;
