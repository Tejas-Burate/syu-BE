const express = require("express");
const {
  createEducationLevel,
  getAllEducationLevels,
  getEducationLevelById,
  updateEducationLevelById,
  deleteEducationLevelById,
} = require("./educationLevelMasterController");

const router = express.Router();

router.post("/createEducationLevel", createEducationLevel);
router.get("/getAllEducationLevels", getAllEducationLevels);
router.get("/getEducationLevelById/:id", getEducationLevelById);
router.put("/updateEducationLevelById/:id", updateEducationLevelById);
router.delete("/deleteEducationLevelById/:id", deleteEducationLevelById);

module.exports = router;
