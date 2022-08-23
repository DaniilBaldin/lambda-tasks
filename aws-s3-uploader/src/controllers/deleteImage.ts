import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';

const { sendResponse } = require('../utils/serviceFuncs');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const BUCKET = 'aws-s3-imageuploader';

module.exports.handler = async (event: APIGatewayEvent) => {
    const { id, url } = JSON.parse(event.body as any);
    const bucketName = url.split('/').reverse();
    try {
        const params = {
            TableName: 'images',
            Key: { id: id },
        };
        await dynamoDb.delete(params).promise();
        const bucketParams = {
            Bucket: BUCKET,
            Key: `images/${bucketName[0]}`,
        };
        await s3.deleteObject(bucketParams).promise();
        return sendResponse(200, {
            message: 'Image was deleted!',
        });
    } catch (err) {
        return sendResponse(500, { message: err as Error });
    }
};
