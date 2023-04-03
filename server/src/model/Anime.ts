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
    viewsCount: {
      type: Number,
      default: 0,
    },
    imgCover: String,
    imgAdditional_1: String,
    imgAdditional_2: String,
    imgAdditional_3: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Anime", AnimeSchema);
