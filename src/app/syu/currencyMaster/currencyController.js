const getCurrentDateTime = require("../../../shared/utils/currentTime");
const currencyModel = require("./currencyModel");

const createCurrency = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Please fill all fields..",
      });
      return;
    }
    const currency = await currencyModel.create({
      ...req.body,
    });
    if (!currency) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create currency..",
      });
      return;
    }
    res.status(201).json({
      status: 201,
      error: "201",
      message: "Currency created successfully..",
      data: currency,
    });
  } catch (error) {
    console.log("error", error);
    const errorMessage = error.errors.map((err) => err.message).join(" ,");
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: errorMessage,
    });
  }
};

const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await currencyModel.findAll();
    if (currencies.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "Currency data not found..",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: 200,
      totalRecords: currencies.length,
      data: currencies,
    });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrencyById = async (req, res) => {
  try {
    const id = req.params.id;
    const currency = await currencyModel.findByPk(id);
    if (!currency) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: `Currency of id ${id} is not found`,
      });
      return;
    }
    res.status(200).json({ status: 200, error: 200, data: currency });
  } catch (error) {
    console.error("Error fetching currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCurrencyById = async (req, res) => {
  try {
    const id = req.params.id;

    const [rowsAffected, [updatedCurrency]] = await currencyModel.update(
      { ...req.body },
      { where: { currencyid: id }, returning: true }
    );

    if (rowsAffected === 0 || !updatedCurrency) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update currency of ID ${id}.`,
      });
      return;
    }

    res.status(200).json({ status: 200, error: "200", data: updatedCurrency });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

const deleteCurrencyById = async (req, res) => {
  try {
    const id = req.params.id;
    const currency = await currencyModel.destroy({
      where: { currencyid: id },
    });

    if (!currency) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to delete currency of ID ${id}...`,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      error: "200",
      message: `Currency of currencyId ${id} is successfully deleted..`,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrencyById,
  deleteCurrencyById,
};
