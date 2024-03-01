const express = require("express");
const {
  createCollege,
  getAllCollege,
  getCollegeById,
  updateCollegeById,
  deleteCollegeById,
} = require("./collegeController");

const router = express.Router();

router.post("/createCollege", createCollege);
router.get("/getAllCollege", getAllCollege);
router.get("/getCollegeById/:id", getCollegeById);
router.put("/updateCollegeById/:id", updateCollegeById);
router.delete("/deleteCollegeById/:id", deleteCollegeById);

module.exports = router;
