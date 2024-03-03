const express = require("express");
const {
  createRole,
  getAllRoles,
  getRoleById,
  getRoleByLocation,
  updateRoleById,
  deleteRoleById,
} = require("./roleMasterController");

const router = express.Router();

router.post("/createRole", createRole);
router.get("/getAllRoles", getAllRoles);
router.post("/getRoleByLocation", getRoleByLocation);
router.get("/getRoleById/:id", getRoleById);
router.put("/updateRoleById/:id", updateRoleById);
router.delete("/deleteRoleById/:id", deleteRoleById);

module.exports = router;
