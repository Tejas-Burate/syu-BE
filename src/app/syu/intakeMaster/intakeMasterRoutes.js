const express = require("express");
const {
  createIntake,
  getAllIntakes,
  getIntakeById,
  updateIntakeById,
  deleteIntakeById,
} = require("./intakeMasterController");

const router = express.Router();

router.post("/createIntake", createIntake);
router.get("/getAllIntakes", getAllIntakes);
router.get("/getIntakeById/:id", getIntakeById);
router.put("/updateIntakeById/:id", updateIntakeById);
router.delete("/deleteIntakeById/:id", deleteIntakeById);

module.exports = router;
