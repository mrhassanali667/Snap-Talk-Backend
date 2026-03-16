import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },

        isGroup: {
            type: Boolean,
            default: false,
        },

        groupName: String,
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);
export default mongoose.model("Conversation", ConversationSchema);