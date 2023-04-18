import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    originTitle: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoriesArray: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Categories",
      required: true,
    },
    seasons: {
      type: Number,
      required: true,
    },
    series: {
      type: Number,
      required: true,
    },
    years: {
      type: Array,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },
    characters: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Characters",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Anime", AnimeSchema);
