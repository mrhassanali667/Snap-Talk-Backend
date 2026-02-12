import mongoose from "mongoose";
import Model from "../models/conversation_model.js";

const createConversation = async (data) => await Model.create(data);
const updateConversation = async (id, data) => {
    const { lastMessage } = data;
    if (!lastMessage) {
        throw new Error({ message: "updating is allowed only for the last message." })
    }
    await Model.findByIdAndUpdate(id, data)
}
const deleteConversation = async (id) => await Model.findByIdAndDelete(id)


export {
    createConversation,
    updateConversation,
    deleteConversation
}