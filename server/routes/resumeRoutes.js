const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadResume } = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const { updateResumeStatus } = require("../controllers/resumeController");

router.patch("/:id/status", updateResumeStatus);//CREATE UPDATE STATUS API for shortlisted/rejected

router.post("/upload", protect, upload.single("resume"), uploadResume);


module.exports = router;
