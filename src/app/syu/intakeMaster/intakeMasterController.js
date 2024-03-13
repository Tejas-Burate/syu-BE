const intakeMaster = require("./intakeMasterModel");
const { Sequelize, Op } = require("sequelize");

const createIntake = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const intake = await intakeMaster.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Intake created successfully.",
      data: intake,
    });
  } catch (error) {
    console.error("Error creating intake:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllIntakes = async (req, res) => {
  try {
    const intakes = await intakeMaster.findAll();
    res.status(200).json({
      status: 200,
      error: "200",
      totalRecords: intakes.length,
      data: intakes,
    });
  } catch (error) {
    console.error("Error fetching intakes:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getIntakeById = async (req, res) => {
  try {
    const id = req.params.id;
    const intake = await intakeMaster.findByPk(id);
    if (!intake) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Intake with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: "200", data: intake });
  } catch (error) {
    console.error("Error fetching intake:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateIntakeById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await intakeMaster.update(
      { ...req.body },
      { where: { intakeid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Intake with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedIntake = await intakeMaster.findByPk(id);
    res.status(200).json({ status: 200, error: "200", data: updatedIntake });
  } catch (error) {
    console.error("Error updating intake:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteIntakeById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await intakeMaster.destroy({
      where: { intakeid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Intake with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Intake with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting intake:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createIntake,
  getAllIntakes,
  getIntakeById,
  updateIntakeById,
  deleteIntakeById,
};
