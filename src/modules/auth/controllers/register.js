import { signUpUser } from "../services/register.js"

const registerController = async (req, res) => {
    try {
        const { user, token } = await signUpUser(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            domain: 'snap-talk-web.netlify.app',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        res.status(201).json({
            message: "successfully register",
            user: user,
            status: 201,
            token: token    
        })
    } catch (error) {
        let code = error?.code || 500
        res.status(500).json({
            message: error?.message || "internal server error",
            status: code
        })
    }
}

export {
    registerController
}