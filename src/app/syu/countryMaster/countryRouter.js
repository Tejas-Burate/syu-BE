const express = require("express");
const {
  createCountry,
  getAllCountry,
  getAllCountryById,
  updateCountryById,
  deleteCountryById,
} = require("./countryController");

const router = express.Router();

router.post("/createCountry", createCountry);
router.get("/getAllCountry", getAllCountry);
router.get("/getAllCountryById/:id", getAllCountryById);
router.put("/updateCountryById/:id", updateCountryById);
router.delete("/deleteCountryById/:id", deleteCountryById);

module.exports = router;
