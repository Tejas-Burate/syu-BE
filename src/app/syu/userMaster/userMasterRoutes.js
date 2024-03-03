const express = require("express");
const {
  // createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("./userMasterController");

const router = express.Router();

// router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);

module.exports = router;
