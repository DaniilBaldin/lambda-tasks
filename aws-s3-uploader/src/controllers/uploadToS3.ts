import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import { v4 } from 'uuid';
import axios from 'axios';

const { sendResponse } = require('../utils/serviceFuncs');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const BUCKET = 'aws-s3-imageuploader';

module.exports.handler = async (event: APIGatewayEvent) => {
    const email = event.requestContext.authorizer!.claims.email;
    try {
        const { url } = JSON.parse(event.body as any);
        const id = v4();
        const key = `images/${v4()}.jpeg`;
        const date = new Date().toISOString();

        const putFromUrl = (url: string, bucket: string) => {
            axios.get(url, { responseType: 'arraybuffer', responseEncoding: 'binary' }).then((response) => {
                const params = {
                    ContentType: response.headers['content-type'],
                    ContentLength: response.data.length.toString(),
                    Bucket: BUCKET,
                    Body: response.data,
                    Key: key,
                };
                return s3.putObject(params).promise();
            });
        };

        const params = {
            Bucket: BUCKET,
            Fields: {
                key: key,
                acl: 'public-read',
                body: url,
            },
            Conditions: [['content-length-range', 0, 10000000], { acl: 'public-read' }],
        };

        const presignedData = {
            data: {},
        };

        s3.createPresignedPost(params, (err, data) => {
            if (err) {
                return (err as Error).message;
            } else {
                putFromUrl(url, BUCKET);
                presignedData.data = data;
                return;
            }
        });

        console.log(presignedData);

        const imageUrl = `https://${BUCKET}.s3.amazonaws.com/${params.Fields.key}`;

        const User = await dynamoDb.get({ TableName: 'users', Key: { email: email } }).promise();

        const Image = {
            id: id,
            user: User.Item!.id,
            url: imageUrl,
            body: url,
            email: email,
            created: date,
        };
        await dynamoDb.put({ TableName: 'images', Item: Image }).promise();
        return sendResponse(201, {
            message: 'Image upload successful!',
            url: imageUrl,
        });
    } catch (err) {
        return sendResponse(500, { message: err as Error });
    }
};
