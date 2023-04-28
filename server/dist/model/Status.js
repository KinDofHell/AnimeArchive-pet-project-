import mongoose from "mongoose";
const StatusSchema = new mongoose.Schema({
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
export default mongoose.model("Status", StatusSchema);
//# sourceMappingURL=Status.js.map