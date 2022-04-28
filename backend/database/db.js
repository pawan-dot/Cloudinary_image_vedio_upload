const mongoose = require("mongoose");
//require("dotenv").config();

const connectDatabase = () => {
    mongoose
        .connect("mongodb://localhost:27017/Product-Image-video", {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        })
};
module.exports = connectDatabase;