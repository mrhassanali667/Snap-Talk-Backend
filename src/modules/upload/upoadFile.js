const uploadFile = (req, res) => {
    try {
        console.log(req.body)
     
    } catch (error) {
        res.json({
            message: "internal erver error",
            status: 500
        })

    }
}

export default uploadFile;