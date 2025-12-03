import mongoose from "mongoose"
import { getAll, getOne } from "../db/index.js"

const getAllData = async (body) => {
    try {
        return await getAll(body)
    } catch (error) {
        throw error
    }
}

const getDataById = async (id, body) => {
    try {
        if (!mongoose.isValidObjectId(id)) {
            let err = new Error("invalid id format.")
            throw { message: err.message, code: 400 }
        }
        const data = await getOne(id, body)
        if (!data) {
            let err = new Error("user not found.")
            throw { message: err.message, code: 404 }
        }
        return data
    } catch (error) {
        throw { message: "internal server error.", code: 500 }
    }
}



export {
    getAllData,
    getDataById
}