const express = require("express");
const {
  createProgrammeLink,
  getAllProgrammeLink,
  getProgrammeLinkById,
  updateProgrammeLinkById,
  deleteProgrammeLinkById,
} = require("./programmelinkController");

const router = express.Router();

router.post("/createProgrammeLink", createProgrammeLink);
router.get("/getAllProgrammeLink", getAllProgrammeLink);
router.get("/getProgrammeLinkById/:id", getProgrammeLinkById);
router.put("/updateProgrammeLinkById/:id", updateProgrammeLinkById);
router.delete("/deleteProgrammeLinkById/:id", deleteProgrammeLinkById);

module.exports = router;
