const express = require("express");
const {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("./courseController");

const router = express.Router();
router.post("/createCourse", createCourse);
router.get("/getAllCourse", getAllCourse);
router.get("/getCourseById/:id", getCourseById);
router.put("/updateCourseById/:id", updateCourseById);
router.delete("/deleteCourseById/:id", deleteCourseById);

module.exports = router;
