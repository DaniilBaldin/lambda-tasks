const fs = require('fs');

let vacations = fs.readFileSync('./src.json', 'utf-8');
vacations = JSON.parse(vacations);
let result = [];
vacations.forEach((el) => {
    const userName = el.user.name;
    const userId = el.user._id;
    const res = { userName, userId, weekend: [] };
    result.push(res);
});

let filteredRes = [...new Set(result.map((obj) => JSON.stringify(obj)))].map((str) =>
    JSON.parse(str)
);

vacations.forEach((el) => {
    const vacDays = { startDate: el.startDate, endDate: el.endDate };
    filteredRes.forEach((element) => {
        if (el.user.name === element.userName) {
            if (element.weekend !== vacDays) {
                element.weekend.push(vacDays);
            }
        }
    });
});
console.log(filteredRes);
fs.writeFileSync('./output.json', JSON.stringify(filteredRes, null, '\t'), 'utf8');
