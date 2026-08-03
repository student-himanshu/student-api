const Joi = require("joi");

const signupSchema = Joi.object({

    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()

});

const loginSchema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().required()

});

const forgotPasswordSchema = Joi.object({

    email: Joi.string().email().required()

});

const resetPasswordSchema = Joi.object({

    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
    newPassword: Joi.string().min(6).required()

});

module.exports = {
    signupSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};
