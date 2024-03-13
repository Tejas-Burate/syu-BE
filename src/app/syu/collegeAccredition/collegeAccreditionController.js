const collegeAccreditationModel = require("./collegeAccreditionModel");
const collegeModel = require("../collegeMaster/collegeModel");
const {
  createTermsAndConditions,
} = require("../termsAndConditions/termsAndConditionsController");

const createCollegeAccreditation = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const collegeAccreditation = await collegeAccreditationModel.create({
      ...req.body,
    });
    if (!collegeAccreditation) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create college contact..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "College contact created successfully..",
      data: collegeAccreditation,
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

const getAllCollegeAccreditation = async (req, res) => {
  try {
    const collegeAccreditation = await collegeAccreditationModel.findAll({
      include: [{ model: collegeModel }],
    });
    if (collegeAccreditation.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "College contact data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: collegeAccreditation.length,
      data: collegeAccreditation,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getCollegeAccreditationById = async (req, res) => {
  try {
    const id = req.params.id;
    const collegeAccreditation = await collegeAccreditationModel.findByPk(id, {
      include: [{ model: collegeModel }],
    });
    if (!collegeAccreditation) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `College contact of id ${id} is not found`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: 200, data: collegeAccreditation });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateCollegeAccreditationById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCollegeAccreditation]] =
      await collegeAccreditationModel.update(
        { ...req.body },
        { where: { clgaccredid: id }, returning: true }
      );

    if (rowsAffected === 0 || !updatedCollegeAccreditation) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update college contact of ID ${id}.`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedCollegeAccreditation });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCollegeAccreditationById = async (req, res) => {
  try {
    const id = req.params.id;
    const collegeAccreditation = await collegeAccreditationModel.destroy({
      where: { clgaccredid: id },
    });

    if (!collegeAccreditation) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete collegeAccreditation of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `collegeAccreditation of collegeAccreditationID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createCollegeAccreditation,
  getAllCollegeAccreditation,
  getCollegeAccreditationById,
  updateCollegeAccreditationById,
  deleteCollegeAccreditationById,
};
