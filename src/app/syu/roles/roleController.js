const roleModel = require("./roleModel");
const getCurrentDateTime = require("../../../shared/middleware/currentTime");

const createRole = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields.",
      });
    }
    const role = await roleModel.create({
      ...req.body,
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
    });
    if (!role) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create role.",
      });
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Role created successfully.",
      data: role,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error",
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.findAll();
    if (roles.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: "Roles data not found.",
      });
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: roles.length,
      data: roles,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await roleModel.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: `Role of ID ${id} is not found.`,
      });
    }
    res.status(200).json({ status: 200, error: 200, data: role });
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected, [updatedRole]] = await roleModel.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { roleId: id }, returning: true }
    );
    if (rowsAffected === 0 || !updatedRole) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update role of ID ${id}.`,
      });
    }
    res.status(200).json({ status: 200, error: "200", data: updatedRole });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error",
    });
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRole = await roleModel.destroy({ where: { roleId: id } });
    if (!deletedRole) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete role of ID ${id}.`,
      });
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Role of ID ${id} is successfully deleted.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error",
    });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
