const express = require("express");
const { globalSearch, searchResult } = require("./searchFiltersController");

const router = express.Router();

router.post("/globalSearch", globalSearch);
router.post("/searchResult", searchResult);

module.exports = router;
