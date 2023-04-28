import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import { handleValidationErrors } from "./utils/imports.js";
import { CheckAuth, CheckProductModerator, CheckAdmin, CheckNewsModerator, } from "./utils/checks/imports.js";
import { CategoryController, CreatorController, AnimeController, UserController, StatusController, RoleController, MangaController, NewsController, CharacterController, } from "./controllers/imports.js";
import { UserValidation, AnimeValidation, CategoryValidation, CreatorValidation, StatusValidation, RoleValidation, MangaValidation, NewsValidation, CharacterValidation, } from "./validations/imports.js";
//env config
dotenv.config();
//db connection
mongoose
    .connect(`${process.env.MONGO_BD_CONNECTION}`)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.error(error));
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
app.post("/upload", upload.array("image"), (req, res) => {
    res.json({
        message: "success",
    });
});
//user
app.post("/register", UserValidation.registerValidation, handleValidationErrors, UserController.registerUser);
app.post("/login", UserValidation.loginValidation, handleValidationErrors, UserController.loginUser);
app.get("/profile", CheckAuth, UserController.profileUser);
app.patch("/user", CheckAuth, UserController.updateUserWatched);
app.patch("/watched-list", CheckAuth, UserController.removeFromWatched);
//role
app.post("/role", CheckAuth, CheckAdmin, RoleValidation.roleValidation, handleValidationErrors, RoleController.createRole);
app.delete("/role/:id", CheckAuth, CheckAdmin, RoleController.removeRole);
app.patch("/role/:id", CheckAuth, CheckAdmin, RoleValidation.roleValidation, handleValidationErrors, RoleController.updateRole);
app.get("/role/", RoleController.getAllRoles);
app.get("/role/:id", RoleController.getOneRole);
//category
app.post("/category", CheckAuth, CheckProductModerator, CategoryValidation.categoryValidation, handleValidationErrors, CategoryController.createCategory);
app.delete("/category/:id", CheckAuth, CheckProductModerator, CategoryController.removeCategory);
app.patch("/category/:id", CheckAuth, CheckProductModerator, CategoryValidation.categoryValidation, handleValidationErrors, CategoryController.updateCategory);
app.get("/category/", CategoryController.getAllCategories);
app.get("/category/:id", CategoryController.getOneCategory);
//creator
app.post("/creator", CheckAuth, CheckProductModerator, CreatorValidation.creatorValidation, handleValidationErrors, CreatorController.createCreator);
app.delete("/creator/:id", CheckAuth, CheckProductModerator, CreatorController.removeCreator);
app.patch("/creator/:id", CheckAuth, CheckProductModerator, CreatorValidation.creatorValidation, handleValidationErrors, CreatorController.updateCreator);
app.get("/creator/", CreatorController.getAllCreators);
app.get("/creator/:id", CreatorController.getOneCreator);
//status
app.post("/status", CheckAuth, CheckProductModerator, StatusValidation.statusValidation, handleValidationErrors, StatusController.createStatus);
app.delete("/status/:id", CheckAuth, CheckProductModerator, StatusController.removeStatus);
app.patch("/status/:id", CheckAuth, CheckProductModerator, StatusValidation.statusValidation, handleValidationErrors, StatusController.updateStatus);
app.get("/status/", StatusController.getAllStatuses);
app.get("/status/:id", StatusController.getOneStatus);
//character
app.post("/character", CheckAuth, CheckProductModerator, CharacterValidation.characterValidation, handleValidationErrors, CharacterController.createCharacter);
app.delete("/character/:id", CheckAuth, CheckProductModerator, CharacterController.removeCharacter);
app.patch("/character/:id", CheckAuth, CheckProductModerator, CharacterValidation.characterValidation, handleValidationErrors, CharacterController.updateCharacter);
app.get("/character", CharacterController.getAllCharacter);
app.get("/character/:id", CharacterController.getOneCharacter);
app.get("/character-popular/", CharacterController.getPopularCharacter);
//anime
app.post("/anime", CheckAuth, CheckProductModerator, AnimeValidation.animeValidation, handleValidationErrors, AnimeController.createAnime);
app.delete("/anime/:id", CheckAuth, CheckProductModerator, AnimeController.removeAnime);
app.patch("/anime/:id", CheckAuth, CheckProductModerator, AnimeValidation.animeValidation, handleValidationErrors, AnimeController.updateAnime);
app.get("/anime/", AnimeController.getAllAnime);
app.get("/anime/popular", AnimeController.getPopularAnime);
app.get("/anime/:id", AnimeController.getOneAnime);
app.get("/anime-recent/", AnimeController.getRecentAnime);
//manga
app.post("/manga", CheckAuth, CheckProductModerator, MangaValidation.mangaValidation, handleValidationErrors, MangaController.createManga);
app.delete("/manga/:id", CheckAuth, CheckProductModerator, MangaController.removeManga);
app.patch("/manga/:id", CheckAuth, CheckProductModerator, MangaValidation.mangaValidation, handleValidationErrors, MangaController.updateManga);
app.get("/manga/", MangaController.getAllManga);
app.get("/manga/popular", MangaController.getPopularManga);
app.get("/manga/:id", MangaController.getOneManga);
app.get("/manga-recent/", MangaController.getRecentManga);
app.post("/news", CheckAuth, CheckNewsModerator, NewsValidation.newsValidation, handleValidationErrors, NewsController.createNews);
app.delete("/news/:id", CheckAuth, CheckNewsModerator, NewsController.removeNews);
app.patch("/news/:id", CheckAuth, CheckNewsModerator, NewsValidation.newsValidation, handleValidationErrors, NewsController.updateNews);
app.get("/news/", NewsController.getAllNews);
app.get("/news/popular", NewsController.getPopularNews);
app.get("/news/:id", NewsController.getOneNews);
app.get("/news-recent/", NewsController.getRecentNews);
const server = app.listen(process.env.PORT, () => {
    console.log("Server is ON");
});
server.on("error", (e) => console.error("Error", e));
//# sourceMappingURL=index.js.map