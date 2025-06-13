const jwt = require("jsonwebtoken");

const authenticateUser = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("auth : ", req.headers);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error("not authorized");
        error.statusCode = 401;
        error.errors = [{ msg: "user is not authorized", params: "auth" }];
        return next(error);
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
      }
}

module.exports = authenticateUser;