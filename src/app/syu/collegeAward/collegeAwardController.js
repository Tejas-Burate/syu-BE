const collegeAwardModel = require("./collegeAwardModel");
const collegeModel = require("../collegeMaster/collegeModel");

const createCollegeAward = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const collegeAward = await collegeAwardModel.create({
      ...req.body,
    });
    if (!collegeAward) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create college award..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "College award created successfully..",
      data: collegeAward,
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

const getAllCollegeAwards = async (req, res) => {
  try {
    const collegeAwards = await collegeAwardModel.findAll({
      include: [{ model: collegeModel }],
    });
    if (collegeAwards.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "College award data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: collegeAwards.length,
      data: collegeAwards,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getCollegeAwardById = async (req, res) => {
  try {
    const id = req.params.id;
    const collegeAward = await collegeAwardModel.findByPk(id, {
      include: [{ model: collegeModel }],
    });
    if (!collegeAward) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `College award of id ${id} is not found`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: 200, data: collegeAward });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateCollegeAwardById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCollegeAward]] =
      await collegeAwardModel.update(
        { ...req.body },
        { where: { clgawardid: id }, returning: true }
      );

    if (rowsAffected === 0 || !updatedCollegeAward) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update college award of ID ${id}.`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedCollegeAward });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCollegeAwardById = async (req, res) => {
  try {
    const id = req.params.id;
    const college = await collegeAwardModel.destroy({
      where: { clgawardid: id },
    });

    if (!college) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete college of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `college of collegeID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createCollegeAward,
  getAllCollegeAwards,
  getCollegeAwardById,
  updateCollegeAwardById,
  deleteCollegeAwardById,
};
