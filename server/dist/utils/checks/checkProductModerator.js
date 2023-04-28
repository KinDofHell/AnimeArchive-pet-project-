import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default async (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const role = decoded.role;
            if (role === "productModerator" || role === "admin")
                next();
            else
                return res.status(403).json({
                    message: "Access denied. You're not product manager",
                });
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
//# sourceMappingURL=checkProductModerator.js.map