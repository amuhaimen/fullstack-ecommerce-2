const express = require("express");
const _ = express.Router();
const categoryController = require("../../controllers/categoryController");
const allcategoryController = require("../../controllers/allCategoryController");
const subCategoryController = require("../../controllers/subCategoryController");
const deleteCategoryController = require("../../controllers/deleteCategoryController");
const editCategoryController = require("../../controllers/editCategoryController");
const allSubcategoryController = require("../../controllers/allSubCategoryController");
const deleteSubCategoryController = require("../../controllers/deleteSubCategoryController");
const editSubCategoryController = require("../../controllers/editSubCategoryController");
const approvecategoryController = require("../../controllers/approveCategoryController");

_.post("/createcategory", categoryController);
_.get("/allcategory", allcategoryController);

_.post("/createsubcategory", subCategoryController);
_.get("/allsubcategory", allSubcategoryController);

//delete category
_.post("/deletecategory", deleteCategoryController);
_.post("/deletesubcategory", deleteSubCategoryController);
_.post("/editcategory", editCategoryController);
_.post("/editsubcategory", editSubCategoryController);
_.post("/approvecategory", approvecategoryController);

module.exports = _;
