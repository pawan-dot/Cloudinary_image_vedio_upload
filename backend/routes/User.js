const express = require("express")
const {
    registerUser,
    login,
    logout,
} = require("../controllers/user");
const router = express.Router();
router.route("/user/register").post(registerUser);
router.route("/user/login").post(login);

//userRouter.route("/logout").get(logout);
module.exports = router;