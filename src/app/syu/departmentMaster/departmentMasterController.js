const departmentModel = require("./departmentMasterModel");
const { Sequelize, Op } = require("sequelize");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createDepartment = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const department = await departmentModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Department created successfully.",
      data: department,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.findAll();
    res.status(200).json({
      status: 200,
      error: "200",
      totalRecords: departments.length,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const department = await departmentModel.findByPk(id);
    if (!department) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Department with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: "200", data: department });
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getDepartmentByLocation = async (req, res) => {
  try {
    const { location } = req.body;
    const department = await departmentModel.findAll({
      where: {
        location: {
          [Op.iLike]: `%${location}%`,
        },
      },
    });
    if (department.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Department with Location ${location} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      totalRecords: department.length,
      data: department,
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateDepartmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await departmentModel.update(
      { ...req.body },
      { where: { departmentid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Department with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedDepartment = await departmentModel.findByPk(id);
    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedDepartment });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteDepartmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await departmentModel.destroy({
      where: { departmentid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Department with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Department with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  getDepartmentByLocation,
  updateDepartmentById,
  deleteDepartmentById,
};
