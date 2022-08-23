module.exports.sendResponse = (statusCode: any, body: any) => {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };
    return response;
};

module.exports.validateInput = (data: any) => {
    const body = JSON.parse(data);
    const { email, password } = body;
    if (!email || !password || password.length < 6) {
        return false;
    }
    return true;
};
