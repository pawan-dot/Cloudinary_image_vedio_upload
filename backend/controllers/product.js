const Product = require("../models/product");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


exports.addPhoto = async (req, res) => {
    // if(!req.user){
    //     return res.status(400).json({message:"User not found"})
    // }
    try {
        const pic = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'document' })
        return res.json({ status: "OK", data: pic })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error uploading...." })
    }
};

// 1.Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const files = JSON.parse(JSON.stringify(req.files.images));
    // console.log(files)
    const myCloud = await cloudinary.v2.uploader.upload(files.tempFilePath, {
        folder: "image",
        width: 150,
        crop: "scale"
    });


    // cloudinary.v2.uploader.upload("../photo/12639280.jpg", (err, result) => {
    //     console.log(result)

    // }).then((result) => {
    //     console.log("success", JSON.stringify(result, null, 2))
    // }).catch((error) => {
    //     console.log("error", JSON.stringify(error, null, 2))
    // })
    const video = req.files.video;

    const myCloudVedio = await cloudinary.v2.uploader.upload(video, {
        resource_type: "video",
        public_id: "myVideo/video",
        chunk_size: 6000000,
        eager: [
            { width: 300, height: 300, crop: "pad", audio_codec: "none" },
            { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }],
        eager_async: true,
        eager_notification_url: "https://mysite.example.com/notify_endpoint"
    },
        function (error, result) { console.log(result, error) });



    const product = await Product.create({
        title,
        image: {
            // public_id: "photo",
            // url: "simple",
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        video: {
            // public_id: "photo",
            // url: "simple",
            public_id: myCloudVedio.public_id,
            url: myCloudVedio.secure_url,
        },
    });


    res.status(201).json({
        success: true,
        product,
    });
});

