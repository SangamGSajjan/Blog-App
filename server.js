const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
// env config
dotenv.config();

// routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
// connect to db
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// static folder
app.use(express.static(path.join(__dirname, "./cleint/build")));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./cleint/build/index.html"));
});

// listen
const PORT = process.env.PORT || 3000;
const DEV_MODE = process.env.NODE_ENV || "development";
app.listen(PORT, () => {
  console.log(
    `Server running on ${DEV_MODE} mode port no ${PORT} `.yellow.bold
  );
});
