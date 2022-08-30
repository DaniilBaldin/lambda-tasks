import { APIGatewayEvent, SQSHandler } from 'aws-lambda';
import Token from './models/token';

const { SQS } = require('aws-sdk');

const sqs = new SQS();

const producer = async (event: APIGatewayEvent) => {
    let statusCode = 200;
    let message;

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No body was found',
            }),
        };
    }

    try {
        await sqs
            .sendMessage({
                QueueUrl: process.env.QUEUE_URL,
                MessageBody: event.body,
                MessageAttributes: {
                    AttributeName: {
                        StringValue: 'Attribute Value',
                        DataType: 'String',
                    },
                },
            })
            .promise();

        message = 'Message accepted!';
    } catch (error) {
        console.log(error);
        message = error;
        statusCode = 500;
    }

    return {
        statusCode,
        body: JSON.stringify({
            message,
        }),
    };
};

const consumer: SQSHandler = async (event) => {
    for (const record of event.Records) {
        console.log('Message Body: ', record.body);
        const resultToken = JSON.parse(record.body).message;
        const token = new Token(resultToken);
        await token.save();
    }
};

module.exports = {
    producer,
    consumer,
};
