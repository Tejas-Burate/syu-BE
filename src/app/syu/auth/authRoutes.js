const express = require("express");
const {
  emailValidationMiddleware,
  phoneValidationMiddleware,
} = require("../../../shared/middleware/validationMiddleware");

const {
  register,
  otpLogin,
  otpVerify,
  emailLogin,
} = require("./authController");

const router = express.Router();

router.post(
  "/register",
  emailValidationMiddleware,
  phoneValidationMiddleware,
  register
);
router.post("/emailLogin", emailLogin);
router.post("/otpLogin", otpLogin);
router.post("/otpVerify", otpVerify);

module.exports = router;
