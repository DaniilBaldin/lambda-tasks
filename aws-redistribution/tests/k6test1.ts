import { sleep, check } from 'k6';
import { Options } from 'k6/options';

import http from 'k6/http';

const url = 'https://ugemtwo2lj.execute-api.us-east-1.amazonaws.com/produce';

export let options: Options = {
    vus: 10,
    iterations: 1000,
};

export default (): void => {
    const randomInt = Math.floor(Math.random() * 10);

    const payload = JSON.stringify({
        message: `random token number ${randomInt}.`,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    sleep(1);
};
