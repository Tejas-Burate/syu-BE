const userStatusModel = require("./userStatusMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createUserStatus = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields.",
      });
    }
    const userStatus = await userStatusModel.create({
      ...req.body,
    });
    return res.status(201).json({
      status: 201,
      error: "201",
      message: "User status created successfully.",
      data: userStatus,
    });
  } catch (error) {
    console.error("Error creating user status:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllUserStatuses = async (req, res) => {
  try {
    const userStatuses = await userStatusModel.findAll();
    if (userStatuses.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: "User status data not found.",
      });
    }
    return res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: userStatuses.length,
      data: userStatuses,
    });
  } catch (error) {
    console.error("Error fetching user statuses:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getUserStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const userStatus = await userStatusModel.findByPk(id);
    if (!userStatus) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: `User status with ID ${id} not found.`,
      });
    }
    return res.status(200).json({ status: 200, error: 200, data: userStatus });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateUserStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected, updatedUserStatus] = await userStatusModel.update(
      { ...req.body },
      { where: { userstatusid: id }, returning: true }
    );
    if (rowsAffected === 0) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update user status with ID ${id}.`,
      });
    }
    return res
      .status(200)
      .json({ status: 200, error: "200", data: updatedUserStatus });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteUserStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await userStatusModel.destroy({
      where: { userstatusid: id },
    });
    if (!rowsDeleted) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete user status with ID ${id}.`,
      });
    }
    return res.status(200).json({
      status: 200,
      error: "200",
      message: `User status with ID ${id} is successfully deleted.`,
    });
  } catch (error) {
    console.error("Error deleting user status:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
};
