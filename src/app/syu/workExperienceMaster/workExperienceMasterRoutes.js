const express = require("express");
const {
  createWorkExperience,
  getAllWorkExperiences,
  getWorkExperienceById,
  getWorkExperienceByUserId,
  updateWorkExperienceById,
  deleteWorkExperienceById,
} = require("./workExperienceMasterController");

const router = express.Router();

router.post("/createWorkExperience", createWorkExperience);
router.get("/getAllWorkExperiences", getAllWorkExperiences);
router.get("/getWorkExperienceById/:id", getWorkExperienceById);
router.get("/getWorkExperienceByUserId/:id", getWorkExperienceByUserId);
router.put("/updateWorkExperienceById/:id", updateWorkExperienceById);
router.delete("/deleteWorkExperienceById/:id", deleteWorkExperienceById);

module.exports = router;
