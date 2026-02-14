import mongoose from "mongoose";
import Model from "../models/conversation_model.js";

const createConversation = async (data) => await Model.create(data);
const updateConversation = async (id, data) => {
    const { lastMessage } = data;
    if (!lastMessage) {
        throw new Error({ message: "Updating is allowed only for the last message." })
    }
    try {
        return await Model.findByIdAndUpdate(id, { lastMessage });
    } catch (error) {
        throw new Error(error?.error || "Error updating conversation.");
    }
}
const deleteConversation = async (id) => await Model.findByIdAndDelete(id)


export {
    createConversation,
    updateConversation,
    deleteConversation
}