const getCurrentDateTime = require("../../../shared/utils/currentTime");

const countryModel = require("./countryModel");

const createCountry = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const country = await countryModel.create({
      ...req.body,
    });
    if (!country) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create country..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "country created successfully..",
      data: country,
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

const getAllCountry = async (req, res) => {
  try {
    const countries = await countryModel.findAll();
    if (countries.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: 404, message: "Country data not found.." });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: countries.length,
      data: countries,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCountryById = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await countryModel.findByPk(id);
    if (!country) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `Country of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: country });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCountryById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCountry]] = await countryModel.update(
      { ...req.body },
      { where: { countryid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedCountry) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update country of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedCountry });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCountryById = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await countryModel.destroy({
      where: { countryid: id },
    });

    if (!country) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete country of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `country of countryID ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createCountry,
  getAllCountry,
  getAllCountryById,
  updateCountryById,
  deleteCountryById,
};
