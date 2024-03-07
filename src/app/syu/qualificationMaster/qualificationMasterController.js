const qualificationModel = require("./qualificationMasterModel");

const createQualification = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const qualificationMaster = await qualificationModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Qualification master created successfully.",
      data: qualificationMaster,
    });
  } catch (error) {
    console.error("Error creating qualification master:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllQualification = async (req, res) => {
  try {
    const qualificationMasters = await qualificationModel.findAll();
    if (qualificationMasters.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: "Qaulification data not found",
      });
      return;
    }
    res
      .status(200)
      .json({
        status: 200,
        error: "200",
        totalRecords: qualificationMasters.length,
        data: qualificationMasters,
      });
  } catch (error) {
    console.error("Error fetching qualification masters:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getQualificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const qualificationMaster = await qualificationModel.findByPk(id);
    if (!qualificationMaster) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Qualification master with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: qualificationMaster });
  } catch (error) {
    console.error("Error fetching qualification master:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateQualificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await qualificationModel.update(
      { ...req.body },
      { where: { studentqualid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Qualification master with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedQualificationMaster = await qualificationModel.findByPk(id);
    res.status(200).json({ status: 200, data: updatedQualificationMaster });
  } catch (error) {
    console.error("Error updating qualification master:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteQualificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await qualificationModel.destroy({
      where: { studentqualid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Qualification master with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Qualification master with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting qualification master:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createQualification,
  getAllQualification,
  getQualificationById,
  updateQualificationById,
  deleteQualificationById,
};
