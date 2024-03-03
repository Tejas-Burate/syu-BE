const express = require("express");
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  getDepartmentByLocation,
  updateDepartmentById,
  deleteDepartmentById,
} = require("./departmentMasterController");

const router = express.Router();

router.post("/createDepartment", createDepartment);
router.get("/getAllDepartments", getAllDepartments);
router.get("/getDepartmentById/:id", getDepartmentById);
router.post("/getDepartmentByLocation", getDepartmentByLocation);
router.put("/updateDepartmentById/:id", updateDepartmentById);
router.delete("/deleteDepartmentById/:id", deleteDepartmentById);

module.exports = router;
