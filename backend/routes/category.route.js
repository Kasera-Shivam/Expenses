import express from "express";
import categoryValidation from "../validations/category.validation.js";
import middleware from "../middleware.js";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router
  .route("/add")
  .post(
    middleware.ValidateSchema(categoryValidation.AddCategorySchema),
    middleware.isAuthenticated,
    categoryController.addCategory
  );

router
  .route("/fetch/all")
  .get(middleware.isAuthenticated, categoryController.fetchMyCategories);

router
  .route("/:category_id/update")
  .put(
    middleware.ValidateSchema(categoryValidation.UpdateCategorySchema),
    middleware.isAuthenticated,
    categoryController.updateCategory
  );

router
  .route("/:category_id/delete")
  .delete(middleware.isAuthenticated, categoryController.deleteCategory);

export default router;
