import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

const server = app.listen(process.env.PORT, () => {
  console.log("Server is ON");
});
server.on("error", (e) => console.error("Error", e));
