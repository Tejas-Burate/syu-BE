const userMasterModel = require("./userMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");
const UserStatus = require("../userStatusMaster/userStatusMasterModel");

// const createUser = async (req, res) => {
//   try {
//     if (!req.body) {
//       res.status(400).json({
//         status: 400,
//         error: "400",
//         message: "Please fill all fields..",
//       });
//       return;
//     }
//     const user = await userMasterModel.create({
//       ...req.body,
//       createdDate: getCurrentDateTime(),
//       updatedDate: getCurrentDateTime(),
//     });
//     if (!user) {
//       res.status(400).json({
//         status: 400,
//         error: "400",
//         message: "Failed to create user..",
//       });
//       return;
//     }
//     res.status(201).json({
//       status: 201,
//       error: "201",
//       message: "User created successfully..",
//       data: user,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res
//       .status(500)
//       .json({ status: 500, error: "500", message: "Internal server error" });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await userMasterModel.findAll({
      include: [{ model: UserStatus }],
    });
    if (users.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "User data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userMasterModel.findByPk(id, {
      include: [{ model: UserStatus }],
    });
    if (!user) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `User with id ${id} not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userMasterModel.update(
      { ...req.body, updateddate: getCurrentDateTime() },
      { where: { userid: id }, returning: true }
    );

    if (user.length === 0) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update user of ID ${id}.`,
      });
      return;
    }
    const updatedUser = await userMasterModel.findByPk(id);
    res.status(200).json({ status: 200, error: "200", data: updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userMasterModel.destroy({
      where: { userid: id },
    });

    if (!user) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete user of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `User of ID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  // createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
