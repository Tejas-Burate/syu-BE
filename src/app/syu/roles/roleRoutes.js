const express = require("express");
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} = require("./roleController");

const router = express.Router();

router.post("/createRole", createRole);
router.get("/getAllRoles", getAllRoles);
router.get("/getRoleById/:id", getRoleById);
router.put("/updateRoleById/:id", updateRoleById);
router.delete("/deleteRoleById/:id", deleteRoleById);

module.exports = router;
