import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import { handleValidationErrors } from "./utils/imports.js";
import {
  CategoryController,
  CreatorController,
  AnimeController,
} from "./controllers/imports.js";
import {
  categoryValidation,
  creatorValidation,
  animeValidation,
} from "./validations.js";

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

//category
app.post(
  "/category",
  categoryValidation,
  handleValidationErrors,
  CategoryController.createCategory
);
app.delete("/category/:id", CategoryController.removeCategory);
app.patch("/category/:id", CategoryController.updateCategory);
app.get("/category/", CategoryController.getAllCategories);
app.get("/category/:id", CategoryController.getOneCategory);

//creator
app.post(
  "/creator",
  creatorValidation,
  handleValidationErrors,
  CreatorController.createCreator
);
app.delete("/creator/:id", CreatorController.removeCreator);
app.patch("/creator/:id", CreatorController.updateCreator);
app.get("/creator/", CreatorController.getAllCreators);
app.get("/creator/:id", CreatorController.getOneCreator);

//anime
app.post(
  "/anime",
  animeValidation,
  handleValidationErrors,
  AnimeController.createAnime
);
app.delete("/anime/:id", AnimeController.removeAnime);
app.patch("/anime/:id", AnimeController.updateAnime);
app.get("/anime/", AnimeController.getAllAnime);
app.get("/anime/:id", AnimeController.getOneAnime);
app.get("/anime-recent/", AnimeController.getRecentAnime);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is ON");
});
server.on("error", (e) => console.error("Error", e));
