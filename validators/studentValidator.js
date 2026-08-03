const Joi = require("joi");

const studentSchema = Joi.object({

    name: Joi.string().min(3).required(),
    age: Joi.number().min(1).required()

});

module.exports = studentSchema;
