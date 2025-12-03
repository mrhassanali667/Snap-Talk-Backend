import uploadImage from "../services/uploadimage.js"

const imageUploadController = async (req, res) => {
    try {
        const URL = await uploadImage(req.file)
        res.status(200).json({
            message: "Image Succcessfully Uploaded",
            imageUrl: URL,
            status: 200
        })
    } catch (error) {
        let code = error.code
        res.status(code).json({
            message: error.message,
            status: code
        })

    }
}
export default imageUploadController