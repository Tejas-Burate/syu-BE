const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByUserId,
  updateStudentById,
  deleteStudentById,
} = require("./studentMasterController");

const router = express.Router();

router.post("/createStudent", createStudent);
router.get("/getAllStudents", getAllStudents);
router.get("/getStudentById/:id", getStudentById);
router.get("/getStudentByUserId/:userId", getStudentByUserId);
router.put("/updateStudentById/:id", updateStudentById);
router.delete("/deleteStudentById/:id", deleteStudentById);

module.exports = router;
