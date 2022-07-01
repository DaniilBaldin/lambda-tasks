console.time('Time passed:');
const axios = require('axios');
const endpoints = require('./src/endpoints');

let trueVal = 0;
let falseVal = 0;

function findNested(obj) {
    for (let i in obj) {
        const value = obj[i];
        if (typeof value === 'boolean') return value;
        if (typeof value === 'object') {
            for (let j in value) {
                if (typeof value[j] === 'boolean') return value[j];
            }
        }
    }
}

async function getRequests(endpoints) {
    try {
        const promises = endpoints.map((endpoint) =>
            axios.get(endpoint).then((resp) => {
                const result = findNested(resp.data);
                console.log(`${endpoint} - ${result}`);
                result ? trueVal++ : falseVal++;
            })
        );
        Promise.all([...promises]).then((e) => {
            console.log(`Amount of true values: ${trueVal}`);
            console.log(`Amount of false values: ${falseVal}`);
            console.timeEnd('Time passed:');
        });
    } catch (err) {
        console.log("Can't reach endpoint! Trying again...");
    }
}
getRequests(endpoints);
