const Joi = require("@hapi/joi")

const validate = {

    registerValidate: (data) => {

        const schema = Joi.object({
            name: Joi.string().required().min(3).max(30),
            email: Joi.string().required().min(3).max(30),
            password: Joi.string().required().min(6).max(100)
        })

        return schema.validate(data)
    },

        loginValidate: (data) => {

        const schema = Joi.object({
            email: Joi.string().required().min(3).max(30),
            password: Joi.string().required().min(6).max(100)
        })

        return schema.validate(data)
    }

}

module.exports = validate

