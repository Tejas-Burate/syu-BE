const express = require("express");
const {
  createApplication,
  getAllApplication,
  getApplicationById,
  getApplicationByManageStudentId,
  updateApplicationById,
  deleteApplicationById,
} = require("./applicationMasterController");

const router = express.Router();

router.post("/createApplication", createApplication);
router.get("/getAllApplication", getAllApplication);
router.get("/getApplicationById/:id", getApplicationById);
router.get(
  "/getApplicationByManageStudentId/:id",
  getApplicationByManageStudentId
);
router.put("/updateApplicationById/:id", updateApplicationById);
router.delete("/deleteApplicationById/:id", deleteApplicationById);

module.exports = router;
