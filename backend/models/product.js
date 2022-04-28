const mongoose = require("mongoose");
var validator = require('validator');

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please Enter product  title"],
    },

    image:
    {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }
    ,
    video:
    {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);