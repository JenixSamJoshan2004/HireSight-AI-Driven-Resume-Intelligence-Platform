const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");//CORS = Cross-Origin Resource Sharing
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());//this server allows requests from other origins.
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  })

  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server start
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const rankRoutes = require("./routes/rankRoutes");

// base url's
app.use(express.urlencoded({ extended: true }));
app.use("/api/rank", rankRoutes);
app.use("/api/auth", authRoutes); // base url for auth
app.use("/api/resumes", resumeRoutes);
app.use("/api/job", jobRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
