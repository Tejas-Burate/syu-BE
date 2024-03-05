const AddressMaster = require("./addressMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createAddress = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const address = await AddressMaster.create({
      ...req.body,
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Address created successfully.",
      data: address,
    });
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const addresses = await AddressMaster.findAll();
    res.status(200).json({ status: 200, data: addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAddressByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const addresses = await AddressMaster.findAll({
      where: { userId: id },
    });
    if (addresses.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `No addresses found for user with ID ${id}.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await AddressMaster.findByPk(id);
    if (!address) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Address with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: address });
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await AddressMaster.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { addressId: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Address with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedAddress = await AddressMaster.findByPk(id);
    res.status(200).json({ status: 200, data: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await AddressMaster.destroy({
      where: { addressId: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Address with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Address with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  getAddressByUserId,
  updateAddressById,
  deleteAddressById,
};
