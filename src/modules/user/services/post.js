import { createData } from "../db/index.js"
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import Model from '../../auth/models/authusermodel.js'
import sharp from "sharp"
import fsExtra from "fs-extra/esm"

const postData = async (token, body) => {
    try {
        if (!body || Object.keys(body).length === 0) {
            let err = new Error("Request body is missing or empty.")
            throw { message: err.message, code: 400 }
        }
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

const uploadProfilePicture = async (id, image) => {
    try {
        await new Promise((res, rej) => {
            sharp(`src/modules/upload/storage/images/${image.filename}`)
                .resize(1000)
                .webp({ quality: 50 })
                .toFile(`src/modules/upload/storage/images/resize-${image.filename}`, (err, info) => {
                    console.log(info)
                    if (err) {
                        rej(err)
                    } else {
                        res()
                    }
                })
        })

        const result = await cloudinary.uploader
            .upload(
                `src/modules/upload/storage/images/resize-${image.filename}`, {
                folder: "profile-images",
                public_id: id
            })

        console.log(result)
        fsExtra.removeSync(`src/modules/upload/storage/images/${image.filename}`)
        fsExtra.removeSync(`src/modules/upload/storage/images/resize-${image.filename}`)
        return result.secure_url


    } catch (error) {
        console.log(error)
        throw { message: new Error("Internal Server Error").message, code: 500 }
    }
}

export {
    postData,
    uploadProfilePicture
}