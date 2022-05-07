const Product = require("../models/product");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const cloudinary = require("cloudinary");
// exports.addPhoto = async (req, res) => {
//     // if(!req.user){
//     //     return res.status(400).json({message:"User not found"})
//     // }
//     try {
//         const pic = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'document' })
//         return res.json({ status: "OK", data: pic })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "Error uploading...." })
//     }
// };

// 1.Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const files = req.files.image;

    const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "image",
    },
        function (error, result) { (result, error) });



    const video = req.files.video;

    const myCloudVedio = await cloudinary.v2.uploader.upload(video.tempFilePath, {
        resource_type: "video",
        folder: "video",
        chunk_size: 6000000,

    },
        function (error, result) { (result, error) });

    const { title } = req.body;

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

//2.get All product
exports.getAllProducts = async (req, res) => {

    try {
        const product = await Product.find();


        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.send(error)

    }

}

//3.get one product

exports.getOneProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            msg: "Product not found",
        })
    }
    res.status(200).json({
        success: true,
        product,

    });

})