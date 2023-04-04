import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import { handleValidationErrors } from "./utils/imports.js";
import {
  CheckAuth,
  CheckProductModerator,
  CheckAdmin,
} from "./utils/checks/imports.js";

import {
  CategoryController,
  CreatorController,
  AnimeController,
  UserController,
  StatusController,
  RoleController,
} from "./controllers/imports.js";

import {
  UserValidation,
  AnimeValidation,
  CategoryValidation,
  CreatorValidation,
  StatusValidation,
  RoleValidation,
} from "./validations/imports.js";

//env config
dotenv.config();

//db connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.skrw0ja.mongodb.net/${process.env.DB_DB}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB Connected"))
  .catch((error: Error) => console.error(error));

//app-express creating
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//routes
//uploads
app.post("/upload", upload.single("image"), (req: any, res: any) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

//user
app.post(
  "/register",
  UserValidation.registerValidation,
  handleValidationErrors,
  UserController.registerUser
);
app.post(
  "/login",
  UserValidation.loginValidation,
  handleValidationErrors,
  UserController.loginUser
);
app.get("/profile", CheckAuth, UserController.profileUser);
app.patch("/user", CheckAuth, UserController.updateUserWatched);
app.patch("/watched-list", CheckAuth, UserController.removeFromWatched);

//category
app.post(
  "/category",
  CheckAuth,
  CheckProductModerator,
  CategoryValidation.categoryValidation,
  handleValidationErrors,
  CategoryController.createCategory
);
app.delete(
  "/category/:id",
  CheckAuth,
  CheckProductModerator,
  CategoryController.removeCategory
);
app.patch(
  "/category/:id",
  CheckAuth,
  CheckProductModerator,
  CategoryController.updateCategory
);
app.get("/category/", CategoryController.getAllCategories);
app.get("/category/:id", CategoryController.getOneCategory);

//creator
app.post(
  "/creator",
  CheckAuth,
  CheckProductModerator,
  CreatorValidation.creatorValidation,
  handleValidationErrors,
  CreatorController.createCreator
);
app.delete(
  "/creator/:id",
  CheckAuth,
  CheckProductModerator,
  CreatorController.removeCreator
);
app.patch(
  "/creator/:id",
  CheckAuth,
  CheckProductModerator,
  CreatorController.updateCreator
);
app.get("/creator/", CreatorController.getAllCreators);
app.get("/creator/:id", CreatorController.getOneCreator);

//anime
app.post(
  "/anime",
  CheckAuth,
  CheckProductModerator,
  AnimeValidation.animeValidation,
  handleValidationErrors,
  AnimeController.createAnime
);
app.delete(
  "/anime/:id",
  CheckAuth,
  CheckProductModerator,
  AnimeController.removeAnime
);
app.patch(
  "/anime/:id",
  CheckAuth,
  CheckProductModerator,
  AnimeController.updateAnime
);
app.get("/anime/", AnimeController.getAllAnime);
app.get("/anime/popular", AnimeController.getPopularAnime);
app.get("/anime/:id", AnimeController.getOneAnime);
app.get("/anime-recent/", AnimeController.getRecentAnime);

//status
app.post(
  "/status",
  CheckAuth,
  CheckProductModerator,
  StatusValidation.statusValidation,
  handleValidationErrors,
  StatusController.createStatus
);
app.delete(
  "/status/:id",
  CheckAuth,
  CheckProductModerator,
  StatusController.removeStatus
);
app.patch(
  "/status/:id",
  CheckAuth,
  CheckProductModerator,
  StatusController.updateStatus
);

app.get("/status/", StatusController.getAllStatuses);
app.get("/status/:id", StatusController.getOneStatus);

//role
app.post(
  "/role",
  CheckAuth,
  CheckAdmin,
  RoleValidation.roleValidation,
  handleValidationErrors,
  RoleController.createRole
);
app.delete("/role/:id", CheckAuth, CheckAdmin, RoleController.removeRole);
app.patch("/role/:id", CheckAuth, CheckAdmin, RoleController.updateRole);

app.get("/role/", RoleController.getAllRoles);
app.get("/role/:id", RoleController.getOneRole);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is ON");
});
server.on("error", (e) => console.error("Error", e));
