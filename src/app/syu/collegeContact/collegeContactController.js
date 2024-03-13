const collegeContactModel = require("./collegeContactModel");
const collegeModel = require("../collegeMaster/collegeModel");

const createCollegeContact = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const collegeContact = await collegeContactModel.create({
      ...req.body,
    });
    if (!collegeContact) {
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
      data: collegeContact,
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

const getAllCollegeContacts = async (req, res) => {
  try {
    const collegeContacts = await collegeContactModel.findAll({
      include: [{ model: collegeModel }],
    });
    if (collegeContacts.length === 0) {
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
      totalRecords: collegeContacts.length,
      data: collegeContacts,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getCollegeContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const collegeContact = await collegeContactModel.findByPk(id, {
      include: [{ model: collegeModel }],
    });
    if (!collegeContact) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `College contact of id ${id} is not found`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: 200, data: collegeContact });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const updateCollegeContactById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCollegeContact]] =
      await collegeContactModel.update(
        { ...req.body },
        { where: { clgcontactid: id }, returning: true }
      );

    if (rowsAffected === 0 || !updatedCollegeContact) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update college contact of ID ${id}.`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedCollegeContact });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCollegeContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const college = await collegeContactModel.destroy({
      where: { clgcontactid: id },
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
  createCollegeContact,
  getAllCollegeContacts,
  getCollegeContactById,
  updateCollegeContactById,
  deleteCollegeContactById,
};
