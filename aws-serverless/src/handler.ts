import { APIGatewayEvent } from 'aws-lambda';
import middy from '@middy/core';
import Boom from '@hapi/boom';
import Joi from 'joi';

import validator from '@middy/validator';

const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
});

const eventSchema = {
    type: 'object',
    required: ['queryStringParameters'],
    properties: {
        queryStringParameters: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type: 'string',
                },
            },
        },
    },
};

const hello = async (event: APIGatewayEvent) => {
    let user = event.queryStringParameters!.name;
    const { value, error } = schema.validate({ name: user });
    if (error) {
        return {
            statusCode: 422,
            body: Boom.badData((error as Error).message).message,
        };
    }
    return {
        statusCode: 200,
        body: `Hello, ${user}!`,
    };
};

export const handler = middy(hello).use(validator({ eventSchema }));
