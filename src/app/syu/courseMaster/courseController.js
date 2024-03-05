const courseModel = require("./courseModel");
const streamModel = require("../streamMaster/streamMasterModel");

const createCourse = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const course = await courseModel.create({
      ...req.body,
    });
    if (!course) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create course..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "course created successfully..",
      data: course,
    });
  } catch (error) {
    console.log("error", error);
    const errorMessage = error.errors.map((err) => err.message).join(" ,");
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const course = await courseModel.findAll({
      include: [{ model: streamModel }],
    });
    if (course.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: 404, message: "course data not found.." });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: course.length,
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await courseModel.findByPk(id, {
      include: [{ model: streamModel }],
    });
    if (!course) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `course of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCourse]] = await courseModel.update(
      { ...req.body },
      { where: { courseid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedCourse) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update course of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedCourse });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await courseModel.destroy({
      where: { courseid: id },
    });

    if (!course) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete course of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `course of courseID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
