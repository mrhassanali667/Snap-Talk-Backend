import { findUser } from "../db/index.js"
import bcrypt from 'bcrypt'
import 'dotenv/config'
import authUserSchema from "../schemas/authuserschema.js"
import jwt from 'jsonwebtoken'



const loginUser = async (body) => {
    try {
        const { email, password } = body
        if (!body || Object.keys(body).length === 0) {
            let err = new Error("Request body is missing or empty.")
            throw { message: err.message, code: 400 }
        }
        authUserSchema.validateSync(body)
        const user = await findUser({
            email: email
        })
        if (user) {
            let checkPass = bcrypt.compareSync(password, user.password)
            if (checkPass) {
                let data = user.toObject()
                delete data.password
                let token = jwt.sign({ email: user.email }, process.env.JWT_KEY)
                return { data, token: token }
            }
            throw { message: new Error("incorrect password").message, code: 400 }
        } else {
            throw { message: new Error("user not found").message, code: 404 }
        }
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

        throw { message: "internal server error.", code: 500 }
    }
}

export {
    loginUser
}