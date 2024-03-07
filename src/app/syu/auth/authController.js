const jwt = require("jsonwebtoken");
const getCurrentDateTime = require("../../../shared/utils/currentTime");
const otpGenerate = require("../../../shared/utils/otpGenerate");
const userModel = require("../userMaster/userMasterModel");
const userRoleMappingModel = require("../userRoleMapping/userRoleMappingModel");
const roleModel = require("../roleMaster/roleMasterModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, referenceId } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10);
    const registerUser = await userModel.create({
      username: fullName,
      email: email,
      phone: phone,
      password: hashedPasword,
      referenceId: referenceId,
    });

    if (!registerUser) {
      res.status(400).json({
        status: 400,
        error: 400,
        message: "Failed to register user...",
      });
      return;
    }

    const user = await userModel.findOne({
      where: {
        phone: phone,
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({
        status: 400,
        error: 400,
        message: "Failed to register user...",
      });
      return;
    }

    const assignRoleToUser = await userRoleMappingModel.create({
      userid: user.userid,
      roleid: 1,
    });

    if (!assignRoleToUser) {
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
    if (error.name === "SequelizeUniqueConstraintError") {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: errorMessage,
      });
    } else {
      console.error("Error:", error);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: "Internal server error",
      });
    }
  }
};

const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "401",
        message: `User with email ${email} not found.`,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        error: "401",
        message: `Incorrect password.`,
      });
    }

    const userRole = await userRoleMappingModel.findOne({
      where: { userid: user.userid },
      include: [{ model: roleModel, attributes: ["rolename"] }],
    });

    const tokenPayload = {
      userid: user.userid,
      usertype: userRole?.Role?.rolename || "unknown",
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: 200,
      error: "200",
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error." });
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
    console.log("User", user);
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, error: "401", message: "User not Authorized" });
    }
    const userRole = await userRoleMappingModel.findOne({
      where: { userid: user.userid },
      include: [{ model: roleModel, attributes: ["rolename"] }],
    });

    console.log("userRole", userRole);

    const token = jwt.sign(
      { userid: user.userid, usertype: userRole.Role.rolename },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      status: 200,
      error: "200",
      message: "OTP verified successfully.",
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error." });
  }
};

module.exports = { register, otpLogin, otpVerify, emailLogin };
