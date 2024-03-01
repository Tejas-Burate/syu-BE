const manageStudentModel = require("./manageStudentMasterModel");
const programmeModel = require("../programMaster/programMasterModel");
const userModel = require("../userMaster/userMasterModel");
const getCurrentDateTime = require("../../../shared/middleware/currentTime");

const createManageStudent = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const student = await manageStudentModel.create({
      ...req.body,
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
    });
    if (!student) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create student..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Student created successfully..",
      data: student,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getAllManageStudents = async (req, res) => {
  try {
    const students = await manageStudentModel.findAll();
    if (students.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "Student data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getManageStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await manageStudentModel.findByPk(id);
    if (!student) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `Student with id ${id} not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};
const getManageStudentByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const student = await manageStudentModel.findAll({
      include: [{ model: userModel }, { model: programmeModel }],
      where: { userId: userId },
    });
    if (student.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `StudentManage data with userId ${userId} not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateManageStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await manageStudentModel.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { studentId: id }, returning: true }
    );

    if (student[0] === 0) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update student of ID ${id}.`,
      });
      return;
    }
    const updatedStudent = await manageStudentModel.findByPk(id);
    res.status(200).json({ status: 200, error: "200", data: updatedStudent });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteManageStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await manageStudentModel.destroy({
      where: { studentId: id },
    });

    if (!student) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete student of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Student of ID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createManageStudent,
  getAllManageStudents,
  getManageStudentById,
  getManageStudentByUserId,
  updateManageStudentById,
  deleteManageStudentById,
};
