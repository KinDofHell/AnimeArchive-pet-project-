import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import UserModel from "../model/User.js";

dotenv.config();

export const registerUser = async (req: any, res: any) => {
  try {
    const password = req.body.password;
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(password, salt);

    const document: any = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      role: req.body.role,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
    const user = await document.save();

    res.json({
      user,
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: "Register failed",
    });
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const user: any = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Login or email not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Login or email not found",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "Login failed",
    });
  }
};
