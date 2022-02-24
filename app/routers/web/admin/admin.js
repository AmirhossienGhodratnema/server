// Require
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.locals.layout = "admin/master";
  next();
});

// Require controller
const AdminController = require("app/http/controllers/admin/adminController");
const CommentControllerAdmin = require("../../../http/controllers/admin/commentControllerAdmin");

// Require Routers
const courses = require("./courses");
const episodes = require("./episodes");

// Middleware
router.use('/courses', courses);
router.use('/episode', episodes);

// Route
router.get("/", AdminController.index);
router.get('/comments', CommentControllerAdmin.index);

module.exports = router;
