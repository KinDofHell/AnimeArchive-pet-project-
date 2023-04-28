import mongoose from "mongoose";
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    linkedAnime: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Anime",
    },
    linkedManga: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Manga",
    },
    linkedCharacters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Characters",
    },
    linkedOuterThing: String,
    isImportant: {
        type: Boolean,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    images: {
        type: [String],
    },
}, {
    timestamps: true,
});
export default mongoose.model("News", NewsSchema);
//# sourceMappingURL=News.js.map