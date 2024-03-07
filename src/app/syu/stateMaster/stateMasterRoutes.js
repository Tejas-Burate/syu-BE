const express = require("express");
const {
  createState,
  getAllStates,
  getStateById,
  getStateByStatename,
  updateStateById,
  deleteStateById,
} = require("./stateMasterController");

const router = express.Router();

router.post("/createState", createState);
router.get("/getAllStates", getAllStates);
router.get("/getStateById/:id", getStateById);
router.post("/getStateByStatename", getStateByStatename);
router.put("/updateStateById/:id", updateStateById);
router.delete("/deleteStateById/:id", deleteStateById);

module.exports = router;
