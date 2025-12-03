import { deleteData } from "../services/delete.js"

const deleteController = async (req, res) => {
    try {
        const { id } = req.params
        await deleteData(id)
        res.status(200).json({
            message: "user successfully deleted",
            status: 200
        })
    } catch (error) {
        console.log(error)
        let code = error?.code
        res.status(code).json({
            message: error?.message,
            status: code
        })

    }
}

export {
    deleteController
}