import { v2 as cloudinary } from 'cloudinary'

const uploadVideo = async (file) => {
    try {
        const uploadedVideo = await cloudinary.uploader
            .upload(`src/modules/upload/storage/videos/${file.filename}`,
                {
                    folder: "videos",
                    resource_type: "video",
                    public_id: file.filename,
                    eager: [
                        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                        { width: 160, height: 100, crop: "crop", gravity: "center", audio_codec: "none" }],
                    eager_async: true,
                })
        console.log(uploadedVideo)
        return uploadedVideo.url
    } catch (error) {
        console.log(error)
        throw { message: new Error("Internal Server Error").message, code: 500 }

    }

}
export default uploadVideo