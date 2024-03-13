const EnglishExam = require("./englishExamModel");
const { Sequelize, Op } = require("sequelize");
const userModel = require("../userMaster/userMasterModel");

const createEnglishExam = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const englishExam = await EnglishExam.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "English exam created successfully.",
      data: englishExam,
    });
  } catch (error) {
    console.error("Error creating English exam:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllEnglishExams = async (req, res) => {
  try {
    const englishExams = await EnglishExam.findAll({
      include: [{ model: userModel }],
    });
    res.status(200).json({
      status: 200,
      error: "200",
      totalRecords: englishExams.length,
      data: englishExams,
    });
  } catch (error) {
    console.error("Error fetching English exams:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getEnglishExamById = async (req, res) => {
  try {
    const id = req.params.id;
    const englishExam = await EnglishExam.findByPk(id, {
      include: [{ model: userModel }],
    });
    if (!englishExam) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `English exam with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: "200", data: englishExam });
  } catch (error) {
    console.error("Error fetching English exam:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateEnglishExamById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await EnglishExam.update(
      { ...req.body },
      { where: { engexamid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `English exam with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedEnglishExam = await EnglishExam.findByPk(id);
    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedEnglishExam });
  } catch (error) {
    console.error("Error updating English exam:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteEnglishExamById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await EnglishExam.destroy({
      where: { engexamid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `English exam with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `English exam with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting English exam:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createEnglishExam,
  getAllEnglishExams,
  getEnglishExamById,
  updateEnglishExamById,
  deleteEnglishExamById,
};
