require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
var cors = require('cors')



//handdle cores
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true
}));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Route Imports
const product = require("./routes/product");


app.use('/api', product);
app.use(express.static(path.join(__dirname, "../frontend/build")));




module.exports = app;