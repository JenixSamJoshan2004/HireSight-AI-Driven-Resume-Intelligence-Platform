const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { rankCandidates } = require("../controllers/rankController");

// 👇 THIS IS THE KEY FIX
router.post("/", upload.array("resumes"), rankCandidates);

module.exports = router;
 