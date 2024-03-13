const express = require("express");
const {
  createProgrammePriority,
  getAllProgrammePriority,
  getProgrammePriorityById,
  updateProgrammePriorityById,
  deleteProgrammePriorityById,
} = require("./programmepriorityController");

const router = express.Router();

router.post("/createProgrammePriority", createProgrammePriority);
router.get("/getAllProgrammePriority", getAllProgrammePriority);
router.get("/getProgrammePriorityById/:id", getProgrammePriorityById);
router.put("/updateProgrammePriorityById/:id", updateProgrammePriorityById);
router.delete("/deleteProgrammePriorityById/:id", deleteProgrammePriorityById);

module.exports = router;
