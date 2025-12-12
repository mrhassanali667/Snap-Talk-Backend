import jwt from 'jsonwebtoken'
import 'dotenv/config'

const tokenVerification = (req, res, next) => {
    try {

        if (req.headers?.authorization) {
            const token = req.headers?.authorization.split(" ")[1]
            const decoded =  jwt.verify(token, process.env.JWT_KEY)
            console.log(decoded)
            req.userEmail = decoded.email
            next()
        } else {
            res.status(400).json({
                message: "token not provided",
                status: 400
            })
        }

    }
    catch (err) {
        res.status(401).json({
            message: "token unauthorized ",
            status: 401
        })
    }
}

export default tokenVerification