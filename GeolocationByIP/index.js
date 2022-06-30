const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ extended: true }));

app.use((req, res) => {
    const request = req.body;
    const reqIp = request.ip.split('.').reduce((r, e) => r * 256 + +e); // look comments below
    let jsonArray = [];
    const rangeIp = () => {
        try {
            let source = fs.readFileSync('./src/IP2LOCATION-LITE-DB1.CSV', 'utf-8');
            let arr = source.split('\n');
            for (let i = 1; i < arr.length; i++) {
                let temp = {};
                let fields = ['start', 'end', 'code', 'country'];
                let valuesArr = arr[i].replace(/['"]+/g, '').split(',');
                for (let k = 0; k < valuesArr.length; k++) {
                    temp[fields[k]] = valuesArr[k];
                }
                jsonArray.push(temp);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    rangeIp(reqIp);
    const checkIpRange = () => {
        const checkIp = reqIp;
        for (let item of jsonArray) {
            if (checkIp >= item.start && checkIp <= item.end) {
                return item;
            }
        }
    };
    res.send(checkIpRange());
});

app.listen(3000, () => {
    console.log('Server is running!');
});

/* 
request.ip.split('.').reduce((r, e) => r * 256 + +e) - This is very elegant way to convert ip adress to number in one line. First it splits ip on points. 
Then in 'reduce' part it does this(for ip: 89.25.176.4):
((89*256+25)*256+176)*256+4=1494855684
*/
// console.log(((89 * 256 + 25) * 256 + 176) * 256 + 4);
