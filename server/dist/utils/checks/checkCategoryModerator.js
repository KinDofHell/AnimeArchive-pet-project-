import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../../model/User.js";
dotenv.config();
export default async (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await UserModel.findById(decoded._id);
            if (user) {
                if (user.role === "admin")
                    next();
                else
                    return res.status(403).json({
                        message: "Access denied. You're not admin",
                    });
            }
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
//# sourceMappingURL=checkCategoryModerator.js.map