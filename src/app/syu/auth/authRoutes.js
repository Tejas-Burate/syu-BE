const express = require("express");

const { otpLogin, otpVerify, emailLogin } = require("./authController");

const router = express.Router();

router.post("/emailLogin", emailLogin);
router.post("/otpLogin", otpLogin);
router.post("/otpVerify", otpVerify);

module.exports = router;
