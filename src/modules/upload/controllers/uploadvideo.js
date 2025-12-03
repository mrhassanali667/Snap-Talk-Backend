import uploadVideo from "../services/uploadvideo.js"

const videoUploadController = async (req, res) => {
    try {
        const URL = await uploadVideo(req.file)
        res.json({
            message: "Video Succcessfully Uploaded",
            videoUrl: URL,
            status: 200
        })
    } catch (error) {
        res.json({
            message: "internal server error",
            status: 500
        })

    }
}
export default videoUploadController