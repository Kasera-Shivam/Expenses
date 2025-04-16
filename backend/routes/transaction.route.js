import express from "express";
import transactionValidation from "../validations/transaction.validation.js";
import middleware from "../middleware.js";
import transactionController from "../controllers/transaction.controller.js";

const router = express.Router();

router
  .route("/add")
  .post(
    middleware.isAuthenticated,
    middleware.ValidateSchema(transactionValidation.AddTransactionSchema),
    transactionController.addTransaction
  );

router
  .route("/fetch/all")
  .get(middleware.isAuthenticated, transactionController.fetchMyTransactions);

router
  .route("/:transaction_id/update")
  .put(
    middleware.isAuthenticated,
    middleware.ValidateSchema(transactionValidation.UpdateTransactionSchema),
    transactionController.updateTransaction
  );

router
  .route("/:transaction_id/delete")
  .delete(middleware.isAuthenticated, transactionController.deleteTransaction);

export default router;
