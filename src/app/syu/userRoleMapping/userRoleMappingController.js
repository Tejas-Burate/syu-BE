const userModel = require("../userMaster/userMasterModel");
const roleModel = require("../roleMaster/roleMasterModel");
const userRoleMappingModel = require("../userRoleMapping/userRoleMappingModel");
const { Sequelize, Op } = require("sequelize");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createUserRoleMapping = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const userRole = await userRoleMappingModel.create({
      ...req.body,
      createddate: getCurrentDateTime(),
      updateddate: getCurrentDateTime(),
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "userRole created successfully.",
      data: userRole,
    });
  } catch (error) {
    console.error("Error creating userRole:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllUserRoleMapping = async (req, res) => {
  try {
    const userRole = await userRoleMappingModel.findAll({
      include: [{ model: userModel }, { model: roleModel }],
    });
    res.status(200).json({
      status: 200,
      error: "200",
      totalRecords: userRole.length,
      data: userRole,
    });
  } catch (error) {
    console.error("Error fetching userRole:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getUserRoleMappingById = async (req, res) => {
  try {
    const id = req.params.id;
    const userRole = await userRoleMappingModel.findByPk(id, {
      include: [{ model: userModel }, { model: roleModel }],
    });
    if (!userRole) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `userRole with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: "200", data: userRole });
  } catch (error) {
    console.error("Error fetching userRole:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateUserRoleMappingById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await userRoleMappingModel.update(
      { ...req.body, updateddate: getCurrentDateTime() },
      { where: { userroleid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `userRole with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedUserRole = await userRoleMappingModel.findByPk(id);
    res.status(200).json({ status: 200, error: "200", data: updatedUserRole });
  } catch (error) {
    console.error("Error updating userRole:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteUserRoleMappingById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await userRoleMappingModel.destroy({
      where: { userroleid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `userRole with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `userRole with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting userRole:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createUserRoleMapping,
  getAllUserRoleMapping,
  getUserRoleMappingById,
  updateUserRoleMappingById,
  deleteUserRoleMappingById,
};
