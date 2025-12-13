const getUserController = async (req, res) => {
    try {
        const user = req.userEmail; // Assuming user is attached to req in a previous middleware like authentication
        res.status(200).json({
            message: "User fetched successfully",
            user: user,
            status: 200
        })
    } catch (error) {
        let code = error?.code || 500;
        res.status(code).json({
            message: error?.message || "internal server error",
            status: code
        });
    }
}

export {
    getUserController
}