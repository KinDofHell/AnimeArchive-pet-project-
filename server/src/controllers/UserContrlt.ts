import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import UserModel from "../model/User.js";
import fs from "fs";

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
    const user: any = await UserModel.findOne({ email: req.body.email })
      .populate("role")
      .exec();

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
        role: user.role.name,
        watchedAnime: user.watchedAnime,
        readManga: user.ReadManga,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
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

export const profileUser = async (req: any, res: any) => {
  try {
    const user: any = await UserModel.findById(req.userID)
      .populate("role")
      .exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Access denied",
    });
  }
};

export const updateUserWatched = async (req: any, res: any) => {
  try {
    await UserModel.updateOne(
      {
        _id: req.userID,
      },
      {
        $push: {
          watchedAnime: req.body.watchedAnime,
          ReadManga: req.body.ReadManga,
        },
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot toggle anime",
    });
  }
};

export const removeFromWatched = async (req: any, res: any) => {
  try {
    await UserModel.updateOne(
      {
        _id: req.userID,
      },
      {
        $pull: {
          watchedAnime: req.body.watchedAnime,
          ReadManga: req.body.ReadManga,
        },
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot remove anime",
    });
  }
};

export const updateUserInfo = async (req: any, res: any) => {
  try {
    await UserModel.updateOne(
      {
        _id: req.userID,
      },
      req.body
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update user info",
    });
  }
};

export const removeUser = async (req: any, res: any) => {
  try {
    const userID = req.params.id;
    const user = await UserModel.findByIdAndRemove(userID);
    if (fs.existsSync(`../server${user.avatarUrl}`)) {
      fs.unlink(`../server${user.avatarUrl}`, (err) => {
        if (err) console.warn(err);
      });
    }
    res.status(204).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot find user",
    });
  }
};
