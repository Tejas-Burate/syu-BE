const studentModel = require("./studentMasterModel");
const programmeModel = require("../programMaster/programMasterModel");
const userModel = require("../userMaster/userMasterModel");

const createStudent = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const student = await studentModel.create({
      ...req.body,
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

const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.findAll({
      include: [{ model: userModel }],
    });
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

const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByPk(id, {
      include: [{ model: userModel }],
    });
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

const getStudentByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const student = await studentModel.findAll({
      include: [{ model: userModel }],
      where: { userid: userId },
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

const updateStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await studentModel.update(
      { ...req.body },
      { where: { studentid: id }, returning: true }
    );

    if (student[0] === 0) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update student of ID ${id}.`,
      });
      return;
    }
    const updatedStudent = await studentModel.findByPk(id);
    res.status(200).json({ status: 200, error: "200", data: updatedStudent });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.destroy({
      where: { studentid: id },
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
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByUserId,
  updateStudentById,
  deleteStudentById,
};
