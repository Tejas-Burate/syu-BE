const express = require("express");
const {
  createManageStudent,
  getAllManageStudents,
  getManageStudentById,
  getManageStudentByUserId,
  updateManageStudentById,
  deleteManageStudentById,
} = require("./manageStudentMasterController");

const router = express.Router();

router.post("/createManageStudent", createManageStudent);
router.get("/getAllManageStudents", getAllManageStudents);
router.get("/getManageStudentById/:id", getManageStudentById);
router.get("/getManageStudentByUserId/:userId", getManageStudentByUserId);
router.put("/updateManageStudentById/:id", updateManageStudentById);
router.delete("/deleteManageStudentById/:id", deleteManageStudentById);

module.exports = router;
