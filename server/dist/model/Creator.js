import mongoose from "mongoose";
const CreatorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: String,
}, {
    timestamps: true,
});
export default mongoose.model("Creator", CreatorSchema);
//# sourceMappingURL=Creator.js.map