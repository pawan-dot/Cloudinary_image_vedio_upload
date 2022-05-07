// import mongoose from "mongoose";
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        //unique: true,
        required: [true, "Please Enter name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        select: false,
    },


}, { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
//export const User = mongoose.model("User", userSchema);
