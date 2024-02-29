const express = require("express");
const _ = express.Router();
const registrationController = require("../../controllers/registrationController");
const otpController = require("../../controllers/otpController");
const loginController = require("../../controllers/loginController");
const changePasswordController = require("../../controllers/changePasswordController");
const forgotpasswordController = require("../../controllers/forgotPasswordController");
const allUserController = require("../../controllers/userListController");

_.post("/registration", registrationController);
_.post("/otpverify", otpController);
_.post("/login", loginController);
_.post("/forgotpassword", forgotpasswordController);
_.post("/changepassword", changePasswordController);
_.get("/alluser", allUserController);

module.exports = _;
