const holiday = require('date-holidays');
const hd = new holiday('UA');

const deadlineCalc = (input) => {
    const date = new Date(input.dateStart);
    let editing;
    let timeToDeadline;
    let dateStamp = date.toDateString();
    let timeStamp = date.getHours();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    switch (typeof hd.isHoliday(dateStamp)) {
        case 'object':
            return "We don't work on holidays!";
            break;
        case 'boolean':
            break;
    }
    switch (input.language) {
        case 'ukr':
            editing = 1333;
            break;
        case 'rus':
            editing = 1333;
            break;
        case 'en':
            editing = 333;
            break;
    }
    timeToDeadline = (input.count / editing).toFixed(2);
    timeToDeadline = 0.5 + Number(timeToDeadline);
    switch (true) {
        case timeToDeadline >= 6:
            return `Looks like you got a serious task. Finishing it will take ${timeToDeadline} working hours. Please discuss deadline with our manager.`;
        case timeToDeadline <= 1:
            timeToDeadline = 1;
            break;
        default:
            timeToDeadline = timeToDeadline;
            break;
    }
    switch (date.getDay()) {
        case 6:
            return `Today is Saturday. Time to finish task: ${timeToDeadline} hours. It will be done Monday nearly at ${Math.round(
                10 + timeToDeadline
            )}.`;
        case 0:
            return `Today is Sunday. Time to finish task: ${timeToDeadline} hours. It will be done Monday nearly at ${Math.round(
                10 + timeToDeadline
            )}.`;
        default:
            timeToDeadline = timeToDeadline;
            break;
    }
    switch (true) {
        case timeStamp > 19:
            return `It is not working hours. Time to finish task: ${timeToDeadline} hours. It will be done tomorrow nearly at ${Math.round(
                10 + timeToDeadline
            )}.`;
        case timeStamp < 10:
            return `It is not working hours. Time to finish task: ${timeToDeadline} hours. It will be done today nearly at ${Math.round(
                10 + timeToDeadline
            )}.`;
        default:
            timeToDeadline = timeToDeadline;
    }
    return Number(timeToDeadline);
};

module.exports = deadlineCalc;
