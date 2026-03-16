import Joi from "joi";
import mongoose from "mongoose";

// ObjectId validation helper
const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

export const conversationSchema = Joi.object({
    participants: Joi.array()
        .items(Joi.string().custom(objectId).required())
        .min(1)
        .required(),

    lastMessage: Joi.string().custom(objectId).optional(),

    isGroup: Joi.boolean().optional(),

    groupName: Joi.when("isGroup", {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow(""),
    }),

    groupAdmin: Joi.when("isGroup", {
        is: true,
        then: Joi.string().custom(objectId).required(),
        otherwise: Joi.string().optional(),
    }),
});

export default conversationSchema;
