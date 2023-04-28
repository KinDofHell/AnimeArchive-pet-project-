import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
    name: {
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
export default mongoose.model("Roles", RoleSchema);
//# sourceMappingURL=Role.js.map