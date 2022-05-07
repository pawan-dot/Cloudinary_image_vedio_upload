// import { User } from "../model/User.js";
// import jwt from "jsonwebtoken";
require('dotenv').config();
const User = require("../models/user")
const jwt = require("jsonwebtoken")


// 1.Register a User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password,

        });
        // user.save();
        // const token = User.getJWTToken();
        // const token = user.getJWTToken();
        res.status(201).json({
            success: true,
            user,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

    // sendToken(user, 201, res);
}


// 2.LOgin user 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //const user = await User.findOne({ email, password });
        //const user = await User.findOne({ email, password });
        const user = await User.findOne({ email, password })


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",

            });
        }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // console.log(process.env.JWT_SECRET)

        res
            .status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true,
            })
            .json({
                success: true,
                user,
                // message: "Logged In Successfully",
            });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};