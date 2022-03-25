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
const UserController = require("../../../http/controllers/admin/userController");
const PermissionsController = require("../../../http/controllers/admin/permissionsController");
const RoleController = require("../../../http/controllers/admin/roleController");


// Require validations
const CategoriesValidation = require('./../../../validation/categoriesCreateValidation')
const PermissionValidation = require('./../../../validation/permissionValidation')
const RoleValidation = require('./../../../validation/roleValidation')

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


router.get('/user/permissions', PermissionsController.index);
router.get('/user/permissions/create', PermissionsController.create);
router.post('/user/permissions/create', PermissionValidation.handel(), PermissionsController.store);
router.delete('/user/permissions/:id', PermissionsController.distroy);
router.get('/user/permissions/:id/edit', PermissionsController.edit);
router.put('/user/permissions/:id/update', PermissionValidation.handel(), PermissionsController.update);


router.get('/user/addRole/:id', UserController.showAddRole);
router.post('/user/addRole/:id', UserController.storeAddRoleUser);


router.get('/user/role', RoleController.index);
router.get('/user/role/create', RoleController.create);
router.post('/user/role/create', RoleValidation.handel(), RoleController.store);
router.delete('/user/role/:id', RoleController.distroy);
router.get('/user/role/:id/edit', RoleController.edit);
router.put('/user/role/:id/update', RoleValidation.handel(), RoleController.update);


router.post('/upload-image', upload.single("upload"), AdminController.uploadImage);


router.get('/users', UserController.index);
router.delete('/users/:id', UserController.distroy);
router.get('/users/:id/toAdmin', UserController.ToAdmin);



module.exports = router;