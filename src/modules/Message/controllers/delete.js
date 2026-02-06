import { deleteData } from "../services/delete.js"

const deleteController = async (req, res) => {
    try {
        const { id } = req.params
        await deleteData(id)
        res.status(200).json({
            message: "message successfully deleted",
            status: 200
        })
    } catch (error) {
        console.log(error)
        let code = error?.code || 500
        res.status(code).json({
            message: error?.message || "internal server error.",
            status: code
        })

    }
}

export {
    deleteController
}