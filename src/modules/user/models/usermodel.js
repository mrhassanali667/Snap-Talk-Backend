import mongoose, { mongo, Schema } from "mongoose";
import { fr, is } from "zod/locales";


const dataSchema = new Schema({
    authId: { type: mongoose.Types.ObjectId, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    about: { type: String, default: "" },
    profilePicture: { type: String, default: null },
    isAdmin: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
    blockedUsers: [{ type: mongoose.Types.ObjectId, ref: 'User',default: [] }],
})

export default mongoose.model('User', dataSchema)