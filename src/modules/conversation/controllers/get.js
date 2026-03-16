import { getAll, getOne } from "../db/index.js"


const getAllController = async (req, res) => {
    try {
        const conversations = await getAll(req.body)
        res.status(200).json({
            message: "conversations successfully fetched",
            data: conversations,
            total: conversations?.length,
            status: 200
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error.",
            data: null,
            total: 0,
            status: 500

        })
    }
}

const getOneController = async (req, res) => {
    try {
        const { id } = req.params
        const conversation = await getOne(id, req.body)
        res.status(200).json({
            message: "conversation successfully fetched",
            data: conversation,
            status: 200
        })
    } catch (error) {
        console.log(error)
        let code = error.code
        res.status(code).json({
            message: error.message,
            data: null,
            status: code || 500   
        })
    }
}

export {
    getAllController,
    getOneController
}