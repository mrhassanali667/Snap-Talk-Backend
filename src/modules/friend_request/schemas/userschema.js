import { z } from "zod";

export const userSchema = Yup.object({
    sender: z
        .string()
        .min(1, "Sender is required"),

    receiver: z
        .string()
        .min(1, "Receiver is required"),

    status: z
        .enum(["pending", "accepted", "rejected"])
        .optional()
        .default("pending"),

});


export default userSchema