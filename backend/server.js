require('dotenv').config()
const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./database/db");

const PORT = process.env.PORT || 5000;

// Handling Uncaught Exception like console.log(you tube) we not define you tube
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//console.log(youtube)

// Connecting to database
connectDatabase();

//cloudenary uses
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const server = app.listen(PORT, () => {
    console.log(`Server  is working on http://localhost:${PORT}`);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});