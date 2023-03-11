import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { handleValidationErrors } from "./utils/imports.js";
import { CategoryController } from "./controllers/imports.js";

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

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//routes
app.post(
  "/category",
  handleValidationErrors,
  CategoryController.createCategory
);

app.delete("/category/:id", CategoryController.removeCategory);
app.patch("/category/:id", CategoryController.updateCategory);
app.get("/category/", CategoryController.getAllCategories);
app.get("/category/:id", CategoryController.getOneCategory);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is ON");
});
server.on("error", (e) => console.error("Error", e));
