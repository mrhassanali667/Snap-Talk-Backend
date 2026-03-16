import mongoose from "mongoose"
import { deleteDataById, updateDataById } from "../db/index.js"

const deleteData = async (id) => {
    try {
        if (!mongoose.isValidObjectId(id)) {
            let err = new Error("invalid id format.")
            throw { message: err.message, code: 400 }
        }
        const data = await deleteDataById(id)
        if (!data) {
            let err = new Error("user not found.")
            throw { message: err.message, code: 400 }
        }
    } catch (error) {
        throw { message: "internal server error.", code: 500 }
    }
}

export {
    deleteData
}