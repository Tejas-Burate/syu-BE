const StreamMasterModel = require("./streamMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createStream = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const stream = await StreamMasterModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Stream created successfully.",
      data: stream,
    });
  } catch (error) {
    console.error("Error creating stream:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllStreams = async (req, res) => {
  try {
    const streams = await StreamMasterModel.findAll();
    res.status(200).json({ status: 200, data: streams });
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getStreamById = async (req, res) => {
  try {
    const id = req.params.id;
    const stream = await StreamMasterModel.findByPk(id);
    if (!stream) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Stream with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: stream });
  } catch (error) {
    console.error("Error fetching stream:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateStreamById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await StreamMasterModel.update(
      { ...req.body },
      { where: { streamid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Stream with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedStream = await StreamMasterModel.findByPk(id);
    res.status(200).json({ status: 200, data: updatedStream });
  } catch (error) {
    console.error("Error updating stream:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteStreamById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await StreamMasterModel.destroy({
      where: { streamid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Stream with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Stream with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting stream:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createStream,
  getAllStreams,
  getStreamById,
  updateStreamById,
  deleteStreamById,
};
