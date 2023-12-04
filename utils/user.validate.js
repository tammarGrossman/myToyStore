// const Joi = require("joi");
// const userJoiSchema = {
//     login: Joi.object().keys({
//       password: Joi.string(),
//       email: Joi.string()
//         .email({ tlds: { allow: ["com"] } })
//         .error(() => Error("Email is not valid")),
//     }),
//     signIn: Joi.object().keys({
//       name:Joi.string().max(20).required(),
//       password: Joi.string().max(20).required(),
//       email: Joi.string()
//         .email({ tlds: { allow: ["com"] } })
//         .error(() => Error("Email is not valid"))
//         .required(),
//         date_created: Joi.date(),
//         role:'USER'||'ADMIN'
//     }),
//   };
//   module.export =userJoiSchema;
const Joi = require("joi");

const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string()
            .email({ tlds: { allow: ["com"] } })
            .error(() => Error("Email is not valid")),
    }),
    signIn: Joi.object().keys({
        name: Joi.string().max(20).required(),
        password: Joi.string().max(20).required(),
        email: Joi.string()
            .email({ tlds: { allow: ["com"] } })
            .error(() => Error("Email is not valid"))
            .required(),
        date_created: Joi.date(),
        role: Joi.string().valid('USER', 'ADMIN'), // Added a missing 'Joi.string()' here
    }),
};

module.exports = userJoiSchema;  // Fix the typo here