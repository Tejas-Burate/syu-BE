const express = require("express");
const {
  createTermsAndConditions,
  getAllTermsAndConditions,
  getTermsAndConditionsById,
  updateTermsAndConditionsById,
  deleteTermsAndConditionsById,
} = require("./termsAndConditionsController");

const router = express.Router();

router.post("/createTermsAndConditions", createTermsAndConditions);
router.get("/getAllTermsAndConditions", getAllTermsAndConditions);
router.get("/getTermsAndConditionsById/:id", getTermsAndConditionsById);
router.put("/updateTermsAndConditionsById/:id", updateTermsAndConditionsById);
router.delete(
  "/deleteTermsAndConditionsById/:id",
  deleteTermsAndConditionsById
);

module.exports = router;
