import mongoose from "mongoose";
const UserWatchingScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    animeArray: {
        type: [
            {
                title: mongoose.Schema.Types.ObjectId,
                status: String,
            },
        ],
        ref: "Anime",
    },
    mangaArray: {
        type: [
            {
                title: mongoose.Schema.Types.ObjectId,
                status: String,
            },
        ],
        ref: "Manga",
    },
}, {
    timestamps: true,
});
export default mongoose.model("UserWatching", UserWatchingScheme);
//# sourceMappingURL=UserWatching.js.map