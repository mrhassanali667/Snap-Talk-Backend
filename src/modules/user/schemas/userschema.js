import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId validation");

const userSchema = Joi.object({
  authId: objectId.required().messages({
    "any.required": "authId is required",
    "any.invalid": "authId must be a valid ObjectId",
  }),

  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username cannot exceed 30 characters",
      "any.required": "Username is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

  about: Joi.string()
    .allow("")
    .messages({
      "string.base": "About must be a string",
    }),

  profilePicture: Joi.string()
    .uri()
    .allow(null)
    .messages({
      "string.uri": "Profile picture must be a valid URL",
    }),

  isAdmin: Joi.boolean().default(false),

  isOnline: Joi.boolean().default(false),

  lastSeen: Joi.date().default(Date.now),

  friends: Joi.array()
    .items(objectId)
    .messages({
      "array.base": "Friends must be an array of ObjectIds",
      "any.invalid": "Friend id must be a valid ObjectId",
    }),

  blockedUsers: Joi.array()
    .items(objectId)
    .messages({
      "array.base": "Blocked users must be an array of ObjectIds",
      "any.invalid": "Blocked user id must be a valid ObjectId",
    }),
});

export default userSchema;
