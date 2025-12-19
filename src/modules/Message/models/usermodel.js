import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId validation");

const messageJoiSchema = Joi.object({
  sender: objectId.required().messages({
    "any.required": "Sender is required",
    "any.invalid": "Sender must be a valid ObjectId",
  }),

  receiver: objectId.required().messages({
    "any.required": "Receiver is required",
    "any.invalid": "Receiver must be a valid ObjectId",
  }),

  text: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.base": "Text must be a string",
      "string.empty": "Message text is required",
      "any.required": "Message text is required",
    }),

  isRead: Joi.boolean().default(false),
});

export default messageJoiSchema;
