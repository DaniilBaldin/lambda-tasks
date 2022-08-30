import http from 'k6/http';

export default function () {
    const url = 'https://ugemtwo2lj.execute-api.us-east-1.amazonaws.com/produce';

    const randomInt = Math.floor(Math.random() * 10);

    const payload = JSON.stringify({
        message: `random token number ${randomInt}.`,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);
}
