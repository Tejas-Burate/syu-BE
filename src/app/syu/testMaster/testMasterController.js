const testMasterModel = require("./testMasterModel");
const getCurrentDateTime = require("../../../shared/utils/currentTime");

const createTest = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please provide all required fields.",
      });
      return;
    }
    const test = await testMasterModel.create({
      ...req.body,
      createdDate: getCurrentDateTime(),
      updatedDate: getCurrentDateTime(),
    });
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Test created successfully.",
      data: test,
    });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await testMasterModel.findAll();
    res.status(200).json({ status: 200, data: tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const getTestById = async (req, res) => {
  try {
    const id = req.params.id;
    const test = await testMasterModel.findByPk(id);
    if (!test) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: test });
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};
const getTestByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const test = await testMasterModel.findAll({ where: { userId: id } });
    if (!test.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test with User ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({ status: 200, data: test });
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const updateTestById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await testMasterModel.update(
      { ...req.body, updatedDate: getCurrentDateTime() },
      { where: { testId: id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test with ID ${id} not found or no changes applied.`,
      });
      return;
    }
    const updatedTest = await testMasterModel.findByPk(id);
    res.status(200).json({ status: 200, data: updatedTest });
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

const deleteTestById = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await testMasterModel.destroy({
      where: { testId: id },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test with ID ${id} not found.`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Test with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({
      status: 500,
      error: "500",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createTest,
  getAllTests,
  getTestById,
  getTestByUserId,
  updateTestById,
  deleteTestById,
};
