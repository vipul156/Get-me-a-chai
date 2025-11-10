import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    name: {
        type: String,
    },
    razorpayId: {
        type: String,
        default: "",
    },
    razorpaySecret: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || model("User", UserSchema);