import jwt from 'jsonwebtoken'
import 'dotenv/config'

const tokenVerification = (req, res, next) => {
    try {
        console.log(req?.cookies?.token)
        if (req?.cookies?.token) {
            const token = req?.cookies?.token
            const decoded =  jwt.verify(token, process.env.JWT_KEY)
            console.log(decoded)
            req.userEmail = decoded.email
            next();

        } else {
            res.status(400).json({
                message: "token not provided",
                status: 400
            })
        }

    }
    catch (err) {
        console.log(err)
        res.status(401).json({
            message: "token unauthorized ",
            status: 401
        })
    }
}

export default tokenVerification