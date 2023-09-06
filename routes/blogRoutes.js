const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogsController,
} = require("../controllers/blogController");

// router object
const router = express.Router();

// routes

// get all blogs||GET
router.get("/all-blogs", getAllBlogsController);

// create blog||POST
router.post("/create-blog", createBlogController);

// PUT|| update blog
router.put("/update-blog/:id", updateBlogController);

// get single blog||GET
router.get("/get-blog/:id", getBlogByIdController);

// delete blog||DELETE
router.delete("/delete-blog/:id", deleteBlogController);

// get||user blogs
router.get("/user-blogs/:id", getUserBlogsController);

module.exports = router;
