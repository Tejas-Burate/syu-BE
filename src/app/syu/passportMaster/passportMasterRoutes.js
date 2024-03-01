const express = require("express");
const {
  createPassport,
  getAllPassports,
  getPassportById,
  getPassportByUserId,
  updatePassportById,
  deletePassportById,
} = require("./passportMasterController");

const router = express.Router();

router.post("/createPassport", createPassport);
router.get("/getAllPassports", getAllPassports);
router.get("/getPassportById/:id", getPassportById);
router.get("/getPassportByUserId/:id", getPassportByUserId);
router.put("/updatePassportById/:id", updatePassportById);
router.delete("/deletePassportById/:id", deletePassportById);

module.exports = router;
