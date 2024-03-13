const express = require("express");
const {
  createEnglishExam,
  getAllEnglishExams,
  getEnglishExamById,
  updateEnglishExamById,
  deleteEnglishExamById,
} = require("./englishExamController");

const router = express.Router();

router.post("/createEnglishExam", createEnglishExam);
router.get("/getAllEnglishExams", getAllEnglishExams);
router.get("/getEnglishExamById/:id", getEnglishExamById);
router.put("/updateEnglishExamById/:id", updateEnglishExamById);
router.delete("/deleteEnglishExamById/:id", deleteEnglishExamById);

module.exports = router;
