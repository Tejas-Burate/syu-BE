const getCurrentDateTime = require("../../../shared/utils/currentTime");
const countryModel = require("../countryMaster/countryModel");
const stateModel = require("./stateMasterModel");
const { Sequelize, Op } = require("sequelize");

const createState = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const state = await stateModel.create({
      ...req.body,
    });
    if (!state) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create state..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "State created successfully..",
      data: state,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getAllStates = async (req, res) => {
  try {
    const states = await stateModel.findAll({
      include: [{ model: countryModel }],
    });
    if (states.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: 404, message: "State data not found.." });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: states.length,
      data: states,
    });
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStateById = async (req, res) => {
  try {
    const id = req.params.id;
    const state = await stateModel.findByPk(id, {
      include: [{ model: countryModel }],
    });
    if (!state) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `State of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: state });
  } catch (error) {
    console.error("Error fetching state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getStateByStatename = async (req, res) => {
  try {
    const { statename } = req.body;
    const state = await stateModel.findOne({
      where: { statename: { [Sequelize.Op.iLike]: `%${statename}%` } },
      include: [{ model: countryModel }],
    });

    if (!state) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `State of name ${statename} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: state });
  } catch (error) {
    console.error("Error fetching state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateStateById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedState]] = await stateModel.update(
      { ...req.body },
      { where: { stateid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedState) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update state of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedState });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteStateById = async (req, res) => {
  try {
    const id = req.params.id;
    const state = await stateModel.destroy({
      where: { stateid: id },
    });

    if (!state) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete state of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `State of ID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createState,
  getAllStates,
  getStateById,
  getStateByStatename,
  updateStateById,
  deleteStateById,
};
