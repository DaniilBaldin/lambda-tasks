const axios = require('axios');
const endpoints = require('./src/endpoints');

let trueVal = [];
falseVal = [];
function findNested(obj) {
    for (let key in obj) {
        const value = obj[key];
        if (typeof value === 'boolean') {
            console.log(`Value is - ${value}`);
            if (value === true) {
                trueVal.push(value);
            } else {
                falseVal.push(value);
            }
        }
        if (typeof value === 'object') {
            findNested(value);
        }
    }
}

async function getRequests(endpoints) {
    for (let i = 0; i < endpoints.length; i++) {
        try {
            console.log(endpoints[i]);
            await axios.get(endpoints[i]).then((resp) => {
                findNested(resp.data);
            });
        } catch (err) {
            let counter = 0;
            console.log("Can't reach endpoint. Trying again!");
            while (counter < 3) {
                await getRequests(endpoints[i]);
                counter++;
            }
        }
    }
    console.log(`Amount of true values: ${trueVal.length}`);
    console.log(`Amount of false values: ${falseVal.length}`);
}

getRequests(endpoints);
