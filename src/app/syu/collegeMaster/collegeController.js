const getCurrentDateTime = require("../../../shared/utils/currentTime");
const collegeModel = require("./collegeModel");
const programMasterModel = require("../programMaster/programMasterModel");
const cityMasterModel = require("../cityMaster/cityModel");
const countryMasterModel = require("../countryMaster/countryModel");

const createCollege = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const college = await collegeModel.create({
      ...req.body,
    });
    if (!college) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create college..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "college created successfully..",
      data: college,
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

const getAllCollege = async (req, res) => {
  try {
    const college = await collegeModel.findAll({
      include: [{ model: cityMasterModel }, { model: countryMasterModel }],
    });
    if (college.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: 404, message: "College data not found.." });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: college.length,
      data: college,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getCollegeById = async (req, res) => {
  try {
    const id = req.params.id;
    const college = await collegeModel.findByPk(id, {
      include: [{ model: cityMasterModel }, { model: countryMasterModel }],
    });
    if (!college) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `college of id ${id} is not found`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: 200, data: college });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateCollegeById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCollege]] = await collegeModel.update(
      { ...req.body },
      { where: { collegeid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedCollege) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update college of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedCollege });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCollegeById = async (req, res) => {
  try {
    const id = req.params.id;
    const college = await collegeModel.destroy({
      where: { collegeid: id },
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
  createCollege,
  getAllCollege,
  getCollegeById,
  updateCollegeById,
  deleteCollegeById,
};
