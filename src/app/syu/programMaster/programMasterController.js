const { where } = require("sequelize");
const programMasterModel = require("./programMasterModel");
const courseModel = require("../courseMaster/courseModel");
const collegeModel = require("../collegeMaster/collegeModel");
const currencyModel = require("../currencyMaster/currencyModel");
const intakeModel = require("../intakeMaster/intakeMasterModel");

const createProgram = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const program = await programMasterModel.create({
      ...req.body,
    });
    if (!program) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create program..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Program created successfully..",
      data: program,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

const getAllProgram = async (req, res) => {
  try {
    const program = await programMasterModel.findAll({
      include: [
        { model: intakeModel },
        { model: courseModel },
        { model: collegeModel },
        { model: currencyModel },
      ],
      limit: 1,
    });
    if (program.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: 404, message: "program data not found.." });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: program });
  } catch (error) {
    console.error("Error fetching program:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

const getProgramById = async (req, res) => {
  try {
    const id = req.params.id;
    const program = await programMasterModel.findByPk(id, {
      include: [
        { model: intakeModel },
        { model: courseModel },
        { model: collegeModel },
        { model: currencyModel },
      ],
    });
    if (!program) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `program of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: program });
  } catch (error) {
    console.error("Error fetching program:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

const getProgramByCourseId = async (req, res) => {
  try {
    const id = req.params.id;
    const program = await programMasterModel.findAll({
      where: {
        courseid: id,
      },
    });
    if (program.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `program of CourseId ${id} is not found`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: program.length,
      data: program,
    });
  } catch (error) {
    console.error("Error fetching program:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getProgramByCollegeId = async (req, res) => {
  try {
    const id = req.params.id;
    const program = await programMasterModel.findAll({
      where: {
        collegeid: id,
      },
    });
    if (program.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `program of CollegeId ${id} is not found`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: program.length,
      data: program,
    });
  } catch (error) {
    console.error("Error fetching program:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateProgramById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedProgram]] = await programMasterModel.update(
      { ...req.body },
      { where: { programmeid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedProgram) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update programme of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedProgram });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

const deleteProgramById = async (req, res) => {
  try {
    const id = req.params.id;
    const program = await programMasterModel.destroy({
      where: { programmeid: id },
    });

    if (!program) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete programme of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Program of programID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

module.exports = {
  createProgram,
  getAllProgram,
  getProgramById,
  getProgramByCourseId,
  getProgramByCollegeId,
  updateProgramById,
  deleteProgramById,
};
