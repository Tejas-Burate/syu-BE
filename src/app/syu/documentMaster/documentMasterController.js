const documentMasterModel = require("./documentMasterModel");
const getCurrentDateTime = require("../../../shared/middleware/currentTime");

const createDocument = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const document = await documentMasterModel.create({
      ...req.body,
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Document created successfully.",
      data: document,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentMasterModel.findAll();
    res.status(200).json({ status: 200, data: documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getDocumentByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const document = await documentMasterModel.findAll({
      where: { userId: id },
    });
    if (!document.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: document });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};
const getDocumentById = async (req, res) => {
  try {
    const id = req.params.id;
    const document = await documentMasterModel.findByPk(id);
    if (!document) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: document });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateDocumentById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await documentMasterModel.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { documentId: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedDocument = await documentMasterModel.findByPk(id);
    res.status(200).json({ status: 200, data: updatedDocument });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteDocumentById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await documentMasterModel.destroy({
      where: { documentId: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Document with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Document with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentByUserId,
  updateDocumentById,
  deleteDocumentById,
};
