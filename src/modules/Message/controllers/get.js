import { getAllData, getDataById } from "../services/get.js"

const getAllController = async (req, res) => {
    try {
        const users = await getAllData(req.body)
        res.status(200).json({
            message: "users successfully fetched",
            data: users,
            total: users?.length,
            status: 200
        })
    } catch (error) {
        console.log("internal server error.")
        res.status(500).json({
            message: error?.message,
            data: null,
            total: 0,
            status: 500

        })
    }
}

const getOneController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await getDataById(id, req.body)
        res.status(200).json({
            message: "user successfully fetched",
            data: user,
            status: 200
        })
    } catch (error) {
        console.log(error)
        let code = error.code
        res.status(code).json({
            message: error.message,
            data: null,
            status: code
        })
    }
}

export {
    getAllController,
    getOneController
}