const express = require("express");
const {
  createCollegeContact,
  getAllCollegeContacts,
  getCollegeContactById,
  updateCollegeContactById,
  deleteCollegeContactById,
} = require("./collegeContactController");

const router = express.Router();

router.post("/createCollegeContact", createCollegeContact);
router.get("/getAllCollegeContacts", getAllCollegeContacts);
router.get("/getCollegeContactById/:id", getCollegeContactById);
router.put("/updateCollegeContactById/:id", updateCollegeContactById);
router.delete("/deleteCollegeContactById/:id", deleteCollegeContactById);

module.exports = router;
