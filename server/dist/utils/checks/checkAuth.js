import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userID = decoded._id;
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(403).json({
                message: "Error getting access",
            });
        }
    }
    else {
        return res.status(403).json({
            message: "Access denied",
        });
    }
};
//# sourceMappingURL=checkAuth.js.map