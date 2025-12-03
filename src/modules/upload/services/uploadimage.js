import { v2 as cloudinary } from 'cloudinary'
import fsExtra from 'fs-extra';
import sharp from 'sharp';

const uploadImage = async (file) => {
    console.log(file)

    try {
        await new Promise((res, rej) => {
            sharp(`src/modules/upload/storage/images/${file.filename}`)
                .resize(1000)
                .webp({ quality: 50 })
                .toFile(`src/modules/upload/storage/images/resize-${file.filename}`, (err, info) => {
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
                `src/modules/upload/storage/images/resize-${file.filename}`, {
                folder: "images",
                public_id: file.filename
            })

        console.log(result)
        fsExtra.removeSync(`src/modules/upload/storage/images/${file.filename}`)
        fsExtra.removeSync(`src/modules/upload/storage/images/resize-${file.filename}`)
        return result.url


    } catch (error) {
        console.log(error)
        throw { message: new Error("Internal Server Error").message, code: 500 }
    }

}
export default uploadImage