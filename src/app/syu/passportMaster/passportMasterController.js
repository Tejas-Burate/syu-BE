const passportMasterModel = require("./passportMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createPassport = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const passport = await passportMasterModel.create({
      ...req.body,
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Passport created successfully.",
      data: passport,
    });
  } catch (error) {
    console.error("Error creating passport:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllPassports = async (req, res) => {
  try {
    const passports = await passportMasterModel.findAll();
    res.status(200).json({ status: 200, data: passports });
  } catch (error) {
    console.error("Error fetching passports:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getPassportById = async (req, res) => {
  try {
    const id = req.params.id;
    const passport = await passportMasterModel.findByPk(id);
    if (!passport) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Passport with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: passport });
  } catch (error) {
    console.error("Error fetching passport:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};
const getPassportByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const passport = await passportMasterModel.findAll({
      where: { userId: id },
    });
    if (!passport) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Passport with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: passport });
  } catch (error) {
    console.error("Error fetching passport:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updatePassportById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await passportMasterModel.update(
      { ...req.body },
      { where: { passportId: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Passport with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedPassport = await passportMasterModel.findByPk(id);
    res.status(200).json({ status: 200, data: updatedPassport });
  } catch (error) {
    console.error("Error updating passport:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deletePassportById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await PassportMaster.destroy({
      where: { passportId: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Passport with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Passport with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting passport:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createPassport,
  getAllPassports,
  getPassportById,
  getPassportByUserId,
  updatePassportById,
  deletePassportById,
};
