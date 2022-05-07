const express = require("express");
const {

    createProduct,
    getAllProducts,
    getOneProduct,

} = require("../controllers/product");
const router = express.Router();
// const multer = require('multer');
// const path = require("path");


// const uploader = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".pdf") {
//             cb(new Error("File type not supported!"), false)
//             return
//         }
//         cb(null, true);
//     }
// });

//product routes
router
    .route("/products/create")
    .post(createProduct);

router
    .route("/products/getAll")
    .get(getAllProducts);


router.route("/products/getOne/:id").get(getOneProduct);
// router.post('/addDoc', uploader.single("document"), addPhoto);
module.exports = router;