import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: String,
      required: true,
      default: "Not given",
    },
    sex: {
      type: String,
      required: true,
      default: "Not given",
    },
    race: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    partners: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Characters",
    },
    appearance: {
      type: String,
      required: true,
    },
    personality: {
      type: String,
      required: true,
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

export default mongoose.model("Characters", CharacterSchema);
