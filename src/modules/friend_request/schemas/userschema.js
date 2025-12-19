import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId validation");

const friendRequestSchema = Joi.object({
  sender: objectId.required().messages({
    "any.required": "Sender is required",
    "any.invalid": "Sender must be a valid ObjectId",
  }),

  receiver: objectId.required().messages({
    "any.required": "Receiver is required",
    "any.invalid": "Receiver must be a valid ObjectId",
  }),

  status: Joi.string()
    .valid("pending", "accepted", "rejected")
    .default("pending")
    .messages({
      "any.only": "Status must be pending, accepted, or rejected",
    }),
});

export default friendRequestSchema;
