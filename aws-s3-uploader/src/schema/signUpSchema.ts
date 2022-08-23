import Joi from 'joi';

const signUpSchema = Joi.object({
    email: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
});

export default signUpSchema;
