import mongoose, { Schema } from "mongoose";


const dataSchema = new Schema({
    authId: {
        type: mongoose.Types.ObjectId,
        ref: 'AuthUser',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }

    },
    isSeller: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default mongoose.model('User', dataSchema)