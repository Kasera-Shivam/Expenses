import utils from "../utils.js";
import { Transaction } from "../models/transaction.model.js";
import mongoose from "mongoose";

const addTransaction = async (req, res) => {
  const user = req.user;
  let newTransaction = null;
  const { type, category, amount, date, description } = req.body;
  try {
    if (date > Date.now())
      return utils.SendError(res, 400, "Date cannot be in the future.");
    newTransaction = await Transaction.create({
      user: user._id,
      type,
      category,
      amount,
      date,
      description,
    });
    return utils.SendSuccess(res, 201, "Transaction added successfully.", {
      transaction: newTransaction,
    });
  } catch (error) {
    if (newTransaction)
      await Transaction.deleteOne({ _id: newTransaction._id });
    return utils.SendError(res, 500, null, error);
  }
};

const fetchMyTransactions = async (req, res) => {
  const user = req.user;
  const { category, type, fromDate, toDate } = req.query;
  try {
    const filters = { user: user._id };
    if (category) filters.category = category;
    if (type) filters.type = type;
    if (fromDate || toDate) {
      filters.date = {};
      if (fromDate) filters.date.$gte = new Date(fromDate);
      if (toDate) filters.date.$lte = new Date(toDate);
    }
    const transactions = await Transaction.find(filters)
      .populate("user")
      .sort({ date: -1 });
    return utils.SendSuccess(res, 200, null, { transactions });
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

const updateTransaction = async (req, res) => {
  const user = req.user;
  let transactionId = req.params.transaction_id;
  const { type, category, amount, date, description } = req.body;
  if (!mongoose.isValidObjectId(transactionId))
    return utils.SendError(res, 400, "Invalid transaction id.");
  try {
    if (new Date(date) > new Date())
      return utils.SendError(res, 400, "Date cannot be in the future.");
    transactionId = new mongoose.Types.ObjectId(transactionId);
    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: user._id,
    });
    if (!transaction)
      return utils.SendError(res, 404, "Transaction not found.");
    transaction.type = type ?? transaction.type;
    transaction.category = category ?? transaction.category;
    transaction.amount = amount ?? transaction.amount;
    transaction.date = date ?? transaction.date;
    transaction.description = description ?? transaction.description;
    await transaction.save();
    return utils.SendSuccess(res, 200, "Transaction updated successfully.", {
      transaction,
    });
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

const deleteTransaction = async (req, res) => {
  const user = req.user;
  let transactionId = req.params.transaction_id;
  if (!mongoose.isValidObjectId(transactionId))
    return utils.SendError(res, 400, "Invalid transaction id.");
  try {
    transactionId = new mongoose.Types.ObjectId(transactionId);
    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: user._id,
    });
    if (!transaction)
      return utils.SendError(res, 404, "Transaction not found.");
    await Transaction.deleteOne({ _id: transaction._id });
    return utils.SendSuccess(res, 200, "Transaction delete successfully.");
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

export default {
  addTransaction,
  fetchMyTransactions,
  updateTransaction,
  deleteTransaction,
};
