const express = require("express");
const {
  createAddress,
  getAllAddresses,
  getAddressById,
  getAddressByUserId,
  updateAddressById,
  deleteAddressById,
} = require("./addressMasterController");

const router = express.Router();

router.post("/createAddress", createAddress);
router.get("/getAllAddresses", getAllAddresses);
router.get("/getAddressById/:id", getAddressById);
router.get("/getAddressByUserId/:id", getAddressByUserId);
router.put("/updateAddressById/:id", updateAddressById);
router.delete("/deleteAddressById/:id", deleteAddressById);

module.exports = router;
