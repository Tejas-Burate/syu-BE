const educationLevelModel = require("./educationLevelMasterModel");

const createEducationLevel = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const educationLevel = await educationLevelModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Education level created successfully.",
      data: educationLevel,
    });
  } catch (error) {
    console.error("Error creating education level:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllEducationLevels = async (req, res) => {
  try {
    const educationLevels = await educationLevelModel.findAll();
    res
      .status(200)
      .json({
        status: 200,
        error: "200",
        totalRecords: educationLevels.length,
        data: educationLevels,
      });
  } catch (error) {
    console.error("Error fetching education levels:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getEducationLevelById = async (req, res) => {
  try {
    const id = req.params.id;
    const educationLevel = await educationLevelModel.findByPk(id);
    if (!educationLevel) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Education level with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: "200", data: educationLevel });
  } catch (error) {
    console.error("Error fetching education level:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateEducationLevelById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await educationLevelModel.update(
      { ...req.body },
      { where: { edulevelid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Education level with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedEducationLevel = await educationLevelModel.findByPk(id);
    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedEducationLevel });
  } catch (error) {
    console.error("Error updating education level:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteEducationLevelById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await educationLevelModel.destroy({
      where: { edulevelid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Education level with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Education level with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting education level:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createEducationLevel,
  getAllEducationLevels,
  getEducationLevelById,
  updateEducationLevelById,
  deleteEducationLevelById,
};
