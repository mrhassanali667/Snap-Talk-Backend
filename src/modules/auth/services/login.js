import { findUser } from "../db/index.js"
import Model from "../../user/models/usermodel.js"
import bcrypt from 'bcrypt'
import 'dotenv/config'
import authUserSchema from "../schemas/authuserschema.js"
import jwt from 'jsonwebtoken'



const loginUser = async (body) => {
    try {
        const { usernameOrEmail, password } = body
        if (!body || Object.keys(body).length === 0) {
            let err = new Error("Request body is missing or empty.")
            throw { message: err.message, code: 400 }
        }
        if (!usernameOrEmail || !password) {
            let err = new Error("usernameOrEmail and password are required.")
            throw { message: err.message, code: 400 }
        }

        const user = await Model.findOne({
            $or: [
                { email: usernameOrEmail },
                { username: usernameOrEmail }
            ]
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
        if (error?.message) {
            throw { message: error?.message, code: 400 }
        }

        throw { message: "internal server error.", code: 500 }
    }
}

export {
    loginUser
}