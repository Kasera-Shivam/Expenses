import express from "express";
import userRoute from "./user.route.js";
import categoryRoute from "./category.route.js";
import transactionRoute from "./transaction.route.js";

const router = express.Router();

router.use("/account", userRoute);
router.use("/category", categoryRoute);
router.use("/transaction", transactionRoute);

export default router;
