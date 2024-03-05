const express = require("express");
const {
  createStream,
  getAllStreams,
  getStreamById,
  updateStreamById,
  deleteStreamById,
} = require("./streamMasterController");

const router = express.Router();

router.post("/createStream", createStream);
router.get("/getAllStreams", getAllStreams);
router.get("/getStreamById/:id", getStreamById);
router.put("/updateStreamById/:id", updateStreamById);
router.delete("/deleteStreamById/:id", deleteStreamById);

module.exports = router;
