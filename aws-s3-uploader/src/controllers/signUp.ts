import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import signUpSchema from '../schema/signUpSchema';

const { sendResponse, validateInput } = require('../utils/serviceFuncs');

const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.signUp = async (event: APIGatewayEvent) => {
    try {
        const isValid = validateInput(event.body);
        if (!isValid) return sendResponse(400, { message: 'Invalid input!' });
        const { email, password } = JSON.parse(event.body as any);
        const { value, error } = signUpSchema.validate({
            email: email,
            password: password,
        });
        if (error) {
            return Boom.badData((error as Error).message);
        }
        const { user_pool_id } = process.env;
        const id = v4();
        const date = new Date().toISOString();
        const User = {
            id: id,
            email: email,
            created: date,
        };

        const params = {
            UserPoolId: user_pool_id,
            Username: email,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'email_verified',
                    Value: 'true',
                },
            ],
            MessageAction: 'SUPPRESS',
        };
        const response = await cognito.adminCreateUser(params as any).promise();
        if (response.User) {
            const paramsForSetPass = {
                Password: password,
                UserPoolId: user_pool_id,
                Username: email,
                Permanent: true,
            };
            await cognito.adminSetUserPassword(paramsForSetPass as any).promise();
        }

        await dynamoDb.put({ TableName: 'users', Item: User }).promise();
        return sendResponse(200, { message: 'User registration successful!' });
    } catch (err) {
        return sendResponse(500, { message: (err as Error).message });
    }
};
