const express = require("express");
const {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrencyById,
  deleteCurrencyById,
} = require("./currencyController");

const router = express.Router();

router.post("/createCurrency", createCurrency);
router.get("/getAllCurrencies", getAllCurrencies);
router.get("/getCurrencyById/:id", getCurrencyById);
router.put("/updateCurrencyById/:id", updateCurrencyById);
router.delete("/deleteCurrencyById/:id", deleteCurrencyById);

module.exports = router;
