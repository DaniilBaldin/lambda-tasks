import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import Boom from '@hapi/boom';
import signUpSchema from '../schema/signUpSchema';

const { sendResponse, validateInput } = require('../utils/serviceFuncs');
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.login = async (event: APIGatewayEvent) => {
    try {
        const isValid = validateInput(event.body);
        if (!isValid) return sendResponse(400, { message: 'Invalid input' });

        const { email, password } = JSON.parse(event.body as string);
        const { value, error } = signUpSchema.validate({
            email: email,
            password: password,
        });
        if (error) {
            return Boom.badData((error as Error).message);
        }
        const { user_pool_id, client_id } = process.env;

        const params = {
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            UserPoolId: user_pool_id,
            ClientId: client_id,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };
        const response = await cognito.adminInitiateAuth(params as any).promise();
        return sendResponse(200, { message: 'Success', token: response.AuthenticationResult?.IdToken });
    } catch (err) {
        return sendResponse(500, { message: (err as Error).message });
    }
};
