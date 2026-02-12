import Joi from "joi";
import mongoose from "mongoose";

// ObjectId validation helper
const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};


const groupSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required(),

    description: Joi.string()
        .allow("")
        .max(500)
        .optional(),

    avatar: Joi.string()
        .uri()
        .allow("")
        .optional(),

    createdBy: Joi.string()
        .custom(objectId)
        .required(),

    admins: Joi.array()
        .items(Joi.string().custom(objectId))
        .optional(),

    members: Joi.array()
        .items(Joi.string().custom(objectId))
        .optional(),

    isPrivate: Joi.boolean()
        .optional()
});

export default groupSchema
