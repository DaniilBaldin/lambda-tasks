import { APIGatewayEvent } from 'aws-lambda';

const prettylink = require('prettylink');

const tinyurl = new prettylink.TinyURL();

const { sendResponse } = require('./utils/serviceFuncs');

module.exports.handler = async (event: APIGatewayEvent) => {
    try {
        const { url } = JSON.parse(event.body as any);
        const shortURL = await tinyurl.short(url);
        return sendResponse(201, {
            message: 'URL shortening successful!',
            url: shortURL,
        });
    } catch (err) {
        return sendResponse(500, { message: err as Error });
    }
};
