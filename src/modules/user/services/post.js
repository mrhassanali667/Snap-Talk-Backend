import { createData } from "../db/index.js"
// import userScema from "../schemas/userschema.js"
import jwt from 'jsonwebtoken'
import Model from '../../auth/models/authusermodel.js'

const postData = async (token, body) => {
    try {
        if (!body || Object.keys(body).length === 0) {
            let err = new Error("Request body is missing or empty.")
            throw { message: err.message, code: 400 }
        }
        // userScema.validateSync(body)
        const { email } = jwt.verify(token, process.env.JWT_KEY)
        const authUser = await Model.findOne({ email: email })
        const data = await createData({
            authId: authUser._id,
            email: email,
            ...body
        })
        return data;
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
    postData
}