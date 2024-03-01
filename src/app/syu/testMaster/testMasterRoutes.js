const express = require("express");
const {
  createTest,
  getAllTests,
  getTestById,
  getTestByUserId,
  updateTestById,
  deleteTestById,
} = require("./testMasterController");

const router = express.Router();

router.post("/createTest", createTest);
router.get("/getAllTests", getAllTests);
router.get("/getTestById/:id", getTestById);
router.get("/getTestByUserId/:id", getTestByUserId);
router.put("/updateTestById/:id", updateTestById);
router.delete("/deleteTestById/:id", deleteTestById);

module.exports = router;
