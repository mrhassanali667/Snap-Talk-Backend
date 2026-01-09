import { postData, uploadProfilePicture } from "../services/post.js"
import { updateDataById } from "../db/index.js"

const postController = async (req, res) => {
    try {
        const token = req.headers?.authorization.split(" ")[1]
        const user = await postData(token, req.body)
        res.status(201).json({
            message: "user successfully added",
            data: user,
            status: 201
        })
    } catch (error) {
        let code = error.code
        res.status(code).json({
            message: error?.message,
            data: null,
            status: code
        })

    }
}

const uploadProfilePictureController = async (req, res) => {
    try {
        const id = req.userId
        const profilePictureUrl = await uploadProfilePicture(id, req.file);
        const updatedUser = await updateDataById(id, { profilePicture: profilePictureUrl });
        res.status(200).json({
            message: "Profile picture updated successfully",
            data: updatedUser,
            status: 200
        });
    } catch (error) {
        let code = error?.code || 500;
        res.status(code).json({
            message: error?.message || "Internal server error",
            data: null,
            status: code
        });
    }
}

export {
    postController,
    uploadProfilePictureController
}