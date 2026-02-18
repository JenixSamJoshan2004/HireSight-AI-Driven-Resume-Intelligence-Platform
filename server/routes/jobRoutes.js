const express = require("express");
const router = express.Router();
const { matchJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

router.post("/match", protect, matchJob);

module.exports = router;
 