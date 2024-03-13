const express = require("express");
const {
  createCollegeAward,
  getAllCollegeAwards,
  getCollegeAwardById,
  updateCollegeAwardById,
  deleteCollegeAwardById,
} = require("./collegeAwardController");

const router = express.Router();

router.post("/createCollegeAward", createCollegeAward);
router.get("/getAllCollegeAwards", getAllCollegeAwards);
router.get("/getCollegeAwardById/:id", getCollegeAwardById);
router.put("/updateCollegeAwardById/:id", updateCollegeAwardById);
router.delete("/deleteCollegeAwardById/:id", deleteCollegeAwardById);

module.exports = router;
