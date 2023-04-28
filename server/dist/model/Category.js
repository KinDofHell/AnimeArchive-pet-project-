import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("Categories", CategorySchema);
//# sourceMappingURL=Category.js.map