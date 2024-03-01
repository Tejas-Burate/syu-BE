const departmentModel = require("./departmentMasterModel");
const getCurrentDateTime = require("../../../shared/middleware/currentTime");

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
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
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
    res.status(200).json({ status: 200, data: departments });
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
    res.status(200).json({ status: 200, data: department });
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
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { departmentId: id } }
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
    res.status(200).json({ status: 200, data: updatedDepartment });
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
      where: { departmentId: id },
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
  updateDepartmentById,
  deleteDepartmentById,
};
