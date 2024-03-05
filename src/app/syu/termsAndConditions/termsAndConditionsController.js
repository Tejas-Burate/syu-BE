const termsAndConditionsModel = require("./termsAndConditionsModel");

const createTermsAndConditions = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields.",
      });
    }
    const termsAndConditions = await termsAndConditionsModel.create({
      ...req.body,
    });
    return res.status(201).json({
      status: 201,
      error: "201",
      message: "Terms and conditions created successfully.",
      data: termsAndConditions,
    });
  } catch (error) {
    console.error("Error creating terms and conditions:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllTermsAndConditions = async (req, res) => {
  try {
    const termsAndConditions = await termsAndConditionsModel.findAll();
    if (termsAndConditions.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: "Terms and conditions data not found.",
      });
    }
    return res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: termsAndConditions.length,
      data: termsAndConditions,
    });
  } catch (error) {
    console.error("Error fetching terms and conditions:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getTermsAndConditionsById = async (req, res) => {
  try {
    const id = req.params.id;
    const termsAndConditions = await termsAndConditionsModel.findByPk(id);
    if (!termsAndConditions) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: `Terms and conditions with ID ${id} not found.`,
      });
    }
    return res.status(200).json({
      status: 200,
      error: 200,
      data: termsAndConditions,
    });
  } catch (error) {
    console.error("Error fetching terms and conditions:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateTermsAndConditionsById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected, updatedTermsAndConditions] =
      await termsAndConditionsModel.update(
        { ...req.body },
        { where: { termandconditions_id: id }, returning: true }
      );
    if (rowsAffected === 0) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update terms and conditions with ID ${id}.`,
      });
    }
    return res.status(200).json({
      status: 200,
      error: "200",
      data: updatedTermsAndConditions,
    });
  } catch (error) {
    console.error("Error updating terms and conditions:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteTermsAndConditionsById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await termsAndConditionsModel.destroy({
      where: { termandconditions_id: id },
    });
    if (!rowsDeleted) {
      return res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete terms and conditions with ID ${id}.`,
      });
    }
    return res.status(200).json({
      status: 200,
      error: "200",
      message: `Terms and conditions with ID ${id} has been successfully deleted.`,
    });
  } catch (error) {
    console.error("Error deleting terms and conditions:", error);
    return res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createTermsAndConditions,
  getAllTermsAndConditions,
  getTermsAndConditionsById,
  updateTermsAndConditionsById,
  deleteTermsAndConditionsById,
};
