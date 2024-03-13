const getCurrentDateTime = require("../../../shared/utils/currentTime");
const countryModel = require("../countryMaster/countryModel");
const cityModel = require("./cityModel");
const stateModel = require("../stateMaster/stateMasterModel");

const createCity = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const city = await cityModel.create({
      ...req.body,
    });
    if (!city) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create city..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "city created successfully..",
      data: city,
    });
  } catch (error) {
    console.log("error", error);
    // const errorMessage = error.errors.map((err) => err.message).join(" ,");
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      // error: errorMessage,
    });
  }
};

const getAllCity = async (req, res) => {
  try {
    const city = await cityModel.findAll({
      include: [{ model: stateModel }, { model: countryModel }],
    });
    if (city.length === 0) {
      return res
        .status(404)
        .json({ status: 404, error: 404, message: "city data not found.." });
    }
    return res
      .status(200)
      .json({ status: 200, error: 200, totalRecords: city.length, data: city });
  } catch (error) {
    console.error("Error fetching city:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getCityById = async (req, res) => {
  try {
    const id = req.params.id;
    const city = await cityModel.findByPk(id, {
      include: [{ model: stateModel }, { model: countryModel }],
    });
    if (!city) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `city of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: city });
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCityById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCity]] = await cityModel.update(
      { ...req.body },
      { where: { cityid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedCity) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update city of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedCity });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCityById = async (req, res) => {
  try {
    const id = req.params.id;
    const city = await cityModel.destroy({
      where: { cityid: id },
    });

    if (!city) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete city of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `city of cityID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};
module.exports = {
  createCity,
  getAllCity,
  getCityById,
  updateCityById,
  deleteCityById,
};
