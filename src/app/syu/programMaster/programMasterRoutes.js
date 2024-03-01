const express = require("express");
const {
  createProgram,
  getAllProgram,
  getProgramById,
  getProgramByCourseId,
  getProgramByCollegeId,
  updateProgramById,
  deleteProgramById
} = require("./programMasterController");

const router = express.Router();

router.post("/createProgram", createProgram);
router.get("/getAllProgram", getAllProgram);
router.get("/getProgramById/:id", getProgramById);
router.get("/getProgramByCourseId/:id", getProgramByCourseId);
router.get("/getProgramByCollegeId/:id", getProgramByCollegeId);
router.put("/updateProgramById/:id", updateProgramById);
router.delete("/deleteProgramById/:id", deleteProgramById);

module.exports = router;
