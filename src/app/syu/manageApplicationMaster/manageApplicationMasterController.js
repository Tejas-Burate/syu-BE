const manageApplicationModel = require("./manageApplicationMasterModel");
const manageStudentModel = require("../manageStudentMaster/manageStudentMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createApplication = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const application = await manageApplicationModel.create({
      ...req.body,
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
    });
    if (!application) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create application..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Application created successfully..",
      data: application,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getAllApplication = async (req, res) => {
  try {
    const application = await manageApplicationModel.findAll({
      include: [{ model: manageStudentModel }],
      limit: 1,
    });
    if (application.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "application data not found..",
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const application = await manageApplicationModel.findByPk(id, {
      include: [{ model: manageStudentModel }],
    });
    if (!application) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `application of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

const getApplicationByManageStudentId = async (req, res) => {
  try {
    const id = req.params.id;
    const application = await manageApplicationModel.findAll({
      where: {
        studentId: id,
      },
    });
    if (application.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `application of CollegeId ${id} is not found`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: application.length,
      data: application,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

const updateApplicationById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected] = await manageApplicationModel.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { applicationId: id } }
    );

    if (rowsAffected === 0) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update Application of ID ${id}.`,
      });
      return;
    }

    const updatedApplication = await manageApplicationModel.findByPk(id);

    if (!updatedApplication) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to fetch updated Application of ID ${id}.`,
      });
      return;
    }

    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedApplication });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const application = await manageApplicationModel.destroy({
      where: { applicationId: id },
    });

    if (!application) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete application of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Application of application ID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Interna server error" });
  }
};

module.exports = {
  createApplication,
  getAllApplication,
  getApplicationById,
  getApplicationByManageStudentId,
  updateApplicationById,
  deleteApplicationById,
};
