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
const CategoryController = require("../../../http/controllers/admin/categoryController");


// Require validations
const CategoriesValidation = require('./../../../validation/categoriesCreateValidation')

const upload = require("app/hellper/uploadimage");

// Require Routers
const courses = require("./courses");
const episodes = require("./episodes");

// Middleware
router.use('/courses', courses);
router.use('/episode', episodes);

// Route
router.get("/", AdminController.index);

router.get('/comments', CommentControllerAdmin.index);
router.get('/comments/approved', CommentControllerAdmin.approved);
router.delete('/comments/:id', CommentControllerAdmin.distroy);
router.put('/comments/:id', CommentControllerAdmin.update);


router.get('/categories', CategoryController.index);
router.get('/categories/create', CategoryController.create);
router.post('/categories/create', CategoriesValidation.handel(), CategoryController.store);
router.delete('/categories/:id', CategoryController.distroy);
router.get('/categories/:id/edit', CategoryController.edit);
router.put('/categories/:id/update', CategoriesValidation.handel(), CategoryController.update);


router.post('/upload-image', upload.single("upload"), AdminController.uploadImage)



module.exports = router;