const express = require("express");
const {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
} = require("./userStatusMasterController");

const router = express.Router();

router.post("/createUserStatus", createUserStatus);
router.get("/getAllUserStatuses", getAllUserStatuses);
router.get("/getUserStatusById/:id", getUserStatusById);
router.put("/updateUserStatusById/:id", updateUserStatusById);
router.delete("/deleteUserStatusById/:id", deleteUserStatusById);

module.exports = router;
