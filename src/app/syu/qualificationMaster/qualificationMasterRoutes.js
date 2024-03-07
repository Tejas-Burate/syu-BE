const express = require("express");
const {
  createQualification,
  getAllQualification,
  getQualificationById,
  updateQualificationById,
  deleteQualificationById,
} = require("./qualificationMasterController");

const router = express.Router();

router.post("/createQualification", createQualification);
router.get("/getAllQualification", getAllQualification);
router.get("/getQualificationById/:id", getQualificationById);
router.put("/updateQualificationById/:id", updateQualificationById);
router.delete("/deleteQualificationById/:id", deleteQualificationById);

module.exports = router;
