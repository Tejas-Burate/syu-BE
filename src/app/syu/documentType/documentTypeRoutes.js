const express = require("express");
const {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentTypeById,
  deleteDocumentTypeById,
} = require("./documentTypeController");

const router = express.Router();

router.post("/createDocumentType", createDocumentType);
router.get("/getAllDocumentTypes", getAllDocumentTypes);
router.get("/getDocumentTypeById/:id", getDocumentTypeById);
router.put("/updateDocumentTypeById/:id", updateDocumentTypeById);
router.delete("/deleteDocumentTypeById/:id", deleteDocumentTypeById);

module.exports = router;
