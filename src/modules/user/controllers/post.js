import { postData, uploadProfilePicture } from "../services/post.js"
import { updateDataById } from "../db/index.js"

const postController = async (req, res) => {
    try {
        const token = req?.cookies?.token
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

const postGroupController = async (req, res) => {
    try {
        const token = req.cookies?.token
        const group = await createGroup(token, req.body)
        res.status(201).json({
            message: "group successfully created",
            data: group,
            status: 201
        })
    } catch (error) {
        let code = error.code || 500 
        res.status(code).json({
            message: error?.message || "internal server error.",
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
    uploadProfilePictureController,
    postGroupController
}