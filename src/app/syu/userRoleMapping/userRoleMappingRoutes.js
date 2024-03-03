const express = require("express");
const {
  createUserRoleMapping,
  getAllUserRoleMapping,
  getUserRoleMappingById,
  updateUserRoleMappingById,
  deleteUserRoleMappingById,
} = require("./userRoleMappingController");

const router = express.Router();

router.post("/createUserRoleMapping", createUserRoleMapping);
router.get("/getAllUserRoleMapping", getAllUserRoleMapping);
router.get("/getUserRoleMappingById/:id", getUserRoleMappingById);
router.put("/updateUserRoleMappingById/:id", updateUserRoleMappingById);
router.delete("/deleteUserRoleMappingById/:id", deleteUserRoleMappingById);

module.exports = router;
