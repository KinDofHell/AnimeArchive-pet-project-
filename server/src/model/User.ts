import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    watchedAnime: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Anime",
    },
    ReadManga: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Manga",
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
