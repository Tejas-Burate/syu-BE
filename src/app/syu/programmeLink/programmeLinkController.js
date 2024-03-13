const { where } = require("sequelize");
const programmeLinkModel = require("./programmelinkModel");
const collegeModel = require("../collegeMaster/collegeModel");
const courseModel = require("../courseMaster/courseModel");
const programmeModel = require("../programMaster/programMasterModel");

const createProgrammeLink = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const programmeLink = await programmeLinkModel.create({
      ...req.body,
    });
    if (!programmeLink) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create programme link..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Programme link created successfully..",
      data: programmeLink,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getAllProgrammeLink = async (req, res) => {
  try {
    const programmeLink = await programmeLinkModel.findAll({
      include: [
        { model: collegeModel },
        { model: courseModel },
        { model: programmeModel },
      ],
    });
    if (programmeLink.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "Programme link data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: programmeLink.length,
      data: programmeLink,
    });
  } catch (error) {
    console.error("Error fetching programme link:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getProgrammeLinkById = async (req, res) => {
  try {
    const id = req.params.id;
    const programmeLink = await programmeLinkModel.findByPk(id, {
      include: [
        { model: collegeModel },
        { model: courseModel },
        { model: programmeModel },
      ],
    });
    if (!programmeLink) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `Programme link of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: programmeLink });
  } catch (error) {
    console.error("Error fetching programme link:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateProgrammeLinkById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected, [updatedProgrammeLink]] =
      await programmeLinkModel.update(
        { ...req.body },
        { where: { programmelinkid: id }, returning: true }
      );

    if (rowsAffected === 0 || !updatedProgrammeLink) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update programme link of ID ${id}.`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedProgrammeLink });
  } catch (error) {
    console.error("Error updating programme link:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteProgrammeLinkById = async (req, res) => {
  try {
    const id = req.params.id;
    const programmeLink = await programmeLinkModel.destroy({
      where: { programmelinkid: id },
    });

    if (!programmeLink) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete programme link of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Programme link of ID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("Error deleting programme link:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createProgrammeLink,
  getAllProgrammeLink,
  getProgrammeLinkById,
  updateProgrammeLinkById,
  deleteProgrammeLinkById,
};
