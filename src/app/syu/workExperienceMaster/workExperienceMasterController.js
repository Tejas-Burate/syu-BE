const workExperienceMasterModel = require("./workExperienceMasterModel");
const userModel = require("../userMaster/userMasterModel");

const createWorkExperience = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const workExperience = await workExperienceMasterModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Work experience created successfully.",
      data: workExperience,
    });
  } catch (error) {
    console.error("Error creating work experience:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllWorkExperiences = async (req, res) => {
  try {
    const workExperiences = await workExperienceMasterModel.findAll({
      include: [{ model: userModel }],
    });
    res.status(200).json({
      status: 200,
      totalRecords: workExperiences.length,
      data: workExperiences,
    });
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getWorkExperienceById = async (req, res) => {
  try {
    const id = req.params.id;
    const workExperience = await workExperienceMasterModel.findByPk(id, {
      include: [{ model: userModel }],
    });
    if (!workExperience) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Work experience with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: workExperience });
  } catch (error) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getWorkExperienceByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const workExperience = await workExperienceMasterModel.findAll({
      where: { userid: id },
      include: [{ model: userModel }],
    });
    if (workExperience.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Work experience data with UserID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: workExperience });
  } catch (error) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateWorkExperienceById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await workExperienceMasterModel.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { experienceId: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Work experience with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedWorkExperience = await workExperienceMasterModel.findByPk(id);
    res.status(200).json({ status: 200, data: updatedWorkExperience });
  } catch (error) {
    console.error("Error updating work experience:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteWorkExperienceById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await WorkExperienceMaster.destroy({
      where: { experienceId: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Work experience with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Work experience with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting work experience:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createWorkExperience,
  getAllWorkExperiences,
  getWorkExperienceById,
  getWorkExperienceByUserId,
  updateWorkExperienceById,
  deleteWorkExperienceById,
};
