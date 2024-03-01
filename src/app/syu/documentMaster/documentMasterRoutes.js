const express = require("express");
const {
  createDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentByUserId,
  updateDocumentById,
  deleteDocumentById,
} = require("./documentMasterController");

const router = express.Router();

router.post("/createDocument", createDocument);
router.get("/getAllDocuments", getAllDocuments);
router.get("/getDocumentById/:id", getDocumentById);
router.get("/getDocumentByUserId/:id", getDocumentByUserId);
router.put("/updateDocumentById/:id", updateDocumentById);
router.delete("/deleteDocumentById/:id", deleteDocumentById);

module.exports = router;
