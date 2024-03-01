const getCurrentDateTime = require("../../../shared/middleware/currentTime");
const otpGenerate = require("../../../shared/middleware/otpGenerate");
const userModel = require("../userMaster/userMasterModel");

const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      where: { email: email, password: password },
    });
    if (!user) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `User of email ${email} is not found..`,
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
    const { mobileNo } = req.body;
    console.log("mobileNo", mobileNo);
    const user = await userModel.findOne({ where: { mobileNo: mobileNo } });
    if (!user) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `User of mobile No ${mobileNo} is not found..`,
      });
      return;
    }
    let newOtp = otpGenerate();
    console.log("newOtp", newOtp);
    const updateUser = await userModel.update(
      { otp: newOtp },
      { where: { mobileNo: mobileNo } }
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
    const { newOtp, mobileNo } = req.body;
    const user = await userModel.findOne({
      where: { mobileNo: mobileNo, otp: newOtp },
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

module.exports = { otpLogin, otpVerify, emailLogin };
