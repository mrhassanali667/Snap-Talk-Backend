import { signUpUser } from "../services/register.js"

const registerController = async (req, res) => {
    try {
        const { user, token } = await signUpUser(req.body)
        res.status(201).json({
            message: "successfully register",
            user: user,
            status: 201,
            token: token
        })
    } catch (error) {
        let code = error?.code
        res.status(500).json({
            message: error?.message,
            status: code
        })
    }
}

export {
    registerController
}