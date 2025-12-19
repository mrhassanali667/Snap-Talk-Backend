import Joi from "joi";

const authUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.alphanum": "Username can only contain letters and numbers",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username cannot be longer than 30 characters",
      "any.required": "Username is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
});

export default authUserSchema;
