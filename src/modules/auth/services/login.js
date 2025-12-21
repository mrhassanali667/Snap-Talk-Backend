import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { findUser } from '../db/index.js'
import User from '../../user/models/usermodel.js'



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

        const authUser = await findUser({
            $or: [
                { email: usernameOrEmail },
                { username: usernameOrEmail }
            ]
        })
        if (authUser) {
            let checkPass = bcrypt.compareSync(password, authUser.password)
            if (checkPass) {
                const user = await User.findOne({ authId: authUser._id });
                let token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
                return { data: user, token: token }
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