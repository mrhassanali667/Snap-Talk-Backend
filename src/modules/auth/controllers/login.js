import { loginUser } from "../services/login.js"

const loginController = async (req, res) => {
    try {
        const { data, token } = await loginUser(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/api',
            domain: 'snap-talk-web.netlify.app',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        res.status(200).json({
            message: "successfully login",
            user: data,
            status: 200,
            token: token
        })
    } catch (error) {
        let code = error?.code
        res.status(code).json({
            message: error?.message,
            user: null,
            status: code
        })
    }
}

export {
    loginController
}