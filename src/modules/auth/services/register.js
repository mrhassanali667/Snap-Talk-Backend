import jwt from "jsonwebtoken"
import { registerUser } from "../db/index.js"
import bcrypt from 'bcrypt'
import authUserSchema from "../schemas/authuserschema.js"
import 'dotenv/config'

const signUpUser = async (body) => {
    try {
        if (!body || Object.keys(body).length === 0) {
            let err = new Error("Request body is missing or empty.")
            throw { message: err.message, code: 400 }
        }
        authUserSchema.validateSync(body)
        const password = bcrypt.hashSync(body.password, 10)
        const newUser = await registerUser({
            ...body,
            password,
        })
        let user = newUser.toObject()
        delete user.password
        let token = jwt.sign({ email: user.email }, process.env.JWT_KEY)
        return { user, token: token }
    } catch (error) {
        console.log(error)
        if (error?.code) {
            if (error.code === 11000) {
                let err = new Error("email already in use.")
                throw { message: err?.message, code: 409 }
            }
            throw error
        }

        if (error?.name === "ValidationError") {
            throw { message: error?.message, code: 400 }
        }

        throw { message: error.message || "internal server error.", code: 500 }
    }
}

export {
    signUpUser
}