require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require('cors')


// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());


//handdle cores
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true
}));



const user = require("./routes/User")
app.use("/api", user);

const product = require("./routes/product");
app.use('/api', product);


const token = require("./routes/generateT");
app.use('/api', token);





module.exports = app;