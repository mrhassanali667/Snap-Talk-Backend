import User from "../../user/models/usermodel.js";

const getUserController = async (req, res) => {
    try {
        const user = await User.findById(req.userId); // Assuming user is attached to req in a previous middleware like authentication
        if (user) {
            console.log("Fetched User:", user);
            return res.status(200).json({
                message: "User fetched successfully",
                user: user,
                status: 200
            })
        }
        res.status(200).json({
            message: "User not found",
            user: null,
            status: 404
        })
    } catch (error) {
        res.status(code).json({
            message: "internal server error",
            status: 500
        });
    }
}

export {
    getUserController
}