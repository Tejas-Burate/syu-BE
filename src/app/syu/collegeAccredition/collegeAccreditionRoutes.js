const express = require("express");
const {
  createCollegeAccreditation,
  getAllCollegeAccreditation,
  getCollegeAccreditationById,
  updateCollegeAccreditationById,
  deleteCollegeAccreditationById,
} = require("./collegeAccreditionController");

const router = express.Router();

router.post("/createCollegeAccreditation", createCollegeAccreditation);
router.get("/getAllCollegeAccreditation", getAllCollegeAccreditation);
router.get("/getCollegeAccreditationById/:id", getCollegeAccreditationById);
router.put(
  "/updateCollegeAccreditationById/:id",
  updateCollegeAccreditationById
);
router.delete(
  "/deleteCollegeAccreditationById/:id",
  deleteCollegeAccreditationById
);

module.exports = router;
