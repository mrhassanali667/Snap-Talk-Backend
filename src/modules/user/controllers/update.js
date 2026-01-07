import { updateData } from "../services/update.js"

const updateController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await updateData(id, req.body)
        res.status(200).json({
            message: "user successfully updated",
            data: user,
            status: 200
        })
    } catch (error) {
        let code = error?.code || 500
        res.status(code).json({
            message: error?.message || "internal server error",
            data: null,
            status: code
        })

    }
}

export {
    updateController
}