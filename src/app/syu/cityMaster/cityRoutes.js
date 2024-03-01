const express = require("express");
const {
  createCity,
  getAllCity,
  getCityById,
  updateCityById,
  deleteCityById,
} = require("./cityController");

const router = express.Router();

router.post("/createCity", createCity);
router.get("/getAllCity", getAllCity);
router.get("/getCityById/:id", getCityById);
router.put("/updateCityById/:id", updateCityById);
router.delete("/deleteCityById/:id", deleteCityById);

module.exports = router;
