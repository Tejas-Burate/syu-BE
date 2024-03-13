const { where } = require("sequelize");
const programmePriorityModel = require("./programmepriorityModel");
const countryModel = require("../countryMaster/countryModel");
const collegeModel = require("../collegeMaster/collegeModel");
const programmeModel = require("../programMaster/programMasterModel");
const departmentModel = require("../departmentMaster/departmentMasterModel");

const createProgrammePriority = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const programmePriority = await ProgrammePriorityModel.create({
      ...req.body,
    });
    if (!programmePriority) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create programme priority..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Programme priority created successfully..",
      data: programmePriority,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getAllProgrammePriority = async (req, res) => {
  try {
    const programmePriority = await programmePriorityModel.findAll({
      include: [
        { model: countryModel },
        { model: collegeModel },
        { model: programmeModel },
        { model: departmentModel },
      ],
    });
    if (programmePriority.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "Programme priority data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: programmePriority.length,
      data: programmePriority,
    });
  } catch (error) {
    console.error("Error fetching programme priority:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getProgrammePriorityById = async (req, res) => {
  try {
    const id = req.params.id;
    const programmePriority = await programmePriorityModel.findByPk(id, {
      include: [
        { model: countryModel },
        { model: collegeModel },
        { model: programmeModel },
        { model: departmentModel },
      ],
    });
    if (!programmePriority) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `Programme priority of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: programmePriority });
  } catch (error) {
    console.error("Error fetching programme priority:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateProgrammePriorityById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected, [updatedProgrammePriority]] =
      await programmePriorityModel.update(
        { ...req.body },
        { where: { programpriorityid: id }, returning: true }
      );

    if (rowsAffected === 0 || !updatedProgrammePriority) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update programme priority of ID ${id}.`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedProgrammePriority });
  } catch (error) {
    console.error("Error updating programme priority:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteProgrammePriorityById = async (req, res) => {
  try {
    const id = req.params.id;
    const programmePriority = await programmePriorityModel.destroy({
      where: { programpriorityid: id },
    });

    if (!programmePriority) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete programme priority of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Programme priority of ID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("Error deleting programme priority:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createProgrammePriority,
  getAllProgrammePriority,
  getProgrammePriorityById,
  updateProgrammePriorityById,
  deleteProgrammePriorityById,
};
