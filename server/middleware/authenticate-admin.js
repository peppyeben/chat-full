const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {

        if (token == process.env.JWT_SECRET) {
            next();
        } else {
            throw new Error("Not an admin");
        }
    } catch (error) {
        return res
            .status(403)
            .json({
                message: "Forbidden",
                error,
                auth: req.headers.authorization,
            });
    }
};

module.exports = authenticateAdmin;
