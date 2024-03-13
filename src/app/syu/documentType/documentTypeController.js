const documentTypeModel = require("./documentTypeModel");
const { Sequelize, Op } = require("sequelize");

const createDocumentType = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const documentType = await documentTypeModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Document type created successfully.",
      data: documentType,
    });
  } catch (error) {
    console.error("Error creating document type:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await documentTypeModel.findAll();
    res.status(200).json({
      status: 200,
      error: "200",
      totalRecords: documentTypes.length,
      data: documentTypes,
    });
  } catch (error) {
    console.error("Error fetching document types:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getDocumentTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    const documentType = await documentTypeModel.findByPk(id);
    if (!documentType) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document type with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: "200", data: documentType });
  } catch (error) {
    console.error("Error fetching document type:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateDocumentTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await documentTypeModel.update(
      { ...req.body },
      { where: { documenttypeid: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document type with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedDocumentType = await documentTypeModel.findByPk(id);
    res
      .status(200)
      .json({ status: 200, error: "200", data: updatedDocumentType });
  } catch (error) {
    console.error("Error updating document type:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteDocumentTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await documentTypeModel.destroy({
      where: { documenttypeid: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document type with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Document type with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting document type:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentTypeById,
  deleteDocumentTypeById,
};
