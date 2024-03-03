const Null = require("tedious/lib/data-types/null");
const getCurrentDateTime = require("../../../shared/middleware/currentTime");
const otpGenerate = require("../../../shared/middleware/otpGenerate");
const userModel = require("../userMaster/userMasterModel");

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, referenceId } = req.body;
    const registerUser = await userModel.create({
      username: fullName,
      email: email,
      phone: phone,
      password: password,
      referenceId: referenceId,
      craeteddate: getCurrentDateTime(),
      craeteddate: getCurrentDateTime(),
    });

    if (!registerUser) {
      res.status(400).json({
        status: 400,
        error: 400,
        message: "Failed to register user...",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "User register successfully..",
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error.." });
  }
};

const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      where: { email: email, password: password },
    });
    if (!user) {
      res.status(401).json({
        status: 401,
        error: "401",
        message: `user is unauthorized....`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", message: "Login successful.." });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error.." });
  }
};

const otpLogin = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await userModel.findOne({ where: { phone: phone } });
    if (!user) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `User of phone No ${phone} is not found..`,
      });
      return;
    }
    let newOtp = otpGenerate();
    console.log("newOtp", newOtp);
    const updateUser = await userModel.update(
      { otp: newOtp },
      { where: { phone: phone } }
    );

    if (!updateUser) {
      res
        .status(400)
        .json({ status: 401, error: "400", message: "Failed to send OTP.." });
      return;
    }

    res.status(200).json({ status: 200, error: "200", newOtp: newOtp });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error.." });
  }
};

const otpVerify = async (req, res) => {
  try {
    const { newOtp, phone } = req.body;
    const user = await userModel.findOne({
      where: { phone: phone, otp: newOtp },
    });
    if (!user) {
      res
        .status(401)
        .json({ status: 401, error: "401", message: "User not Authorized" });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: "Otp verified successfully..",
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error.." });
  }
};

module.exports = { register, otpLogin, otpVerify, emailLogin };
