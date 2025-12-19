const logoutController = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api',
            domain: 'https://snap-talk-web.netlify.app/'
        })
        return res.status(200).json({ message: "User logged out successfully." })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error." })
    }
}

export {
    logoutController
}                   