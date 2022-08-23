import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const { sendResponse } = require('../utils/serviceFuncs');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event: APIGatewayEvent) => {
    const email = event.requestContext.authorizer!.claims.email;
    try {
        const params = {
            TableName: 'images',
        };
        const Images = await dynamoDb.scan(params).promise();
        const result: any = [];
        Images.Items!.forEach((e) => {
            if (e.email === email) {
                result.push(`id: ${e.id}, url: ${e.url}`);
            }
        });
        console.log(email, result);
        return sendResponse(200, {
            message: 'List of all uploaded images.',
            links: result,
        });
    } catch (err) {
        return sendResponse(500, { message: err as Error });
    }
};
