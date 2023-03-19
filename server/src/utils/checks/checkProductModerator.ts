import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

import UserModel from "../../model/User.js";

dotenv.config();

export default async (req: any, res: any, next: any) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY);

      // const user = await UserModel.findById(decoded._id);
      const role = decoded.role;
      if (role === "productModerator" || role === "admin") next();
      else
        return res.status(403).json({
          message: "Access denied. You're not admin",
        });
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: "Error getting access",
      });
    }
  } else {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};
