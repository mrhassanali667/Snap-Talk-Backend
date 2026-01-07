import mongoose from "mongoose";
import { updateDataById } from "../db/index.js"

const updateData = async (id, body) => {
    try {
        const { name, email, password, fullName, about } = body;
        if (!mongoose.isValidObjectId(id)) {
            let err = new Error("invalid id format")
            throw { message: err.message, code: 400 }
        }
        if (!body || Object.keys(body).length === 0) {
            let err = new Error("request body is missing or empty.")
            throw { message: err.message, code: 400 }
        }
        if (!name && !email && !password && !fullName && !about) {
            let err = new Error("request contains invalid fields.")
            throw { message: err.message, code: 400 }
        }

        const data = await updateDataById(id, { name, email, password, fullName, about })
        if (!data) {
            let err = new Error("user not found")
            throw { message: err.message, code: 404 }
        }
        return data;
    } catch (error) {
        throw { message: "internal server error", code: 500 }
    }
}

export {
    updateData
}