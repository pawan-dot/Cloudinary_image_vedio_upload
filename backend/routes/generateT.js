const express = require("express")
const {
    generateToken,
    TrackStatus
} = require("../controllers/generateToken");
const router = express.Router();
router.route("/generate/token/").post(generateToken);
router.route("/track/status/").post(TrackStatus);


//userRouter.route("/logout").get(logout);
module.exports = router;