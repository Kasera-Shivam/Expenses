import utils from "../utils.js";
import { Category } from "../models/category.model.js";
import { Transaction } from "../models/transaction.model.js";
import mongoose from "mongoose";

const addCategory = async (req, res) => {
  let newCategory = null;
  try {
    const user = req.user;
    const { name, type } = req.body;
    const categoryExists = await Category.findOne({
      name: name.toLowerCase(),
      type,
    });
    if (categoryExists)
      return utils.SendError(
        res,
        400,
        `Category ${categoryExists.name} already exists.`
      );
    newCategory = await Category.create({
      user: user._id,
      name: name,
      type,
    });
    return utils.SendSuccess(res, 201, "Category created successfully.", {
      category: newCategory,
    });
  } catch (error) {
    if (newCategory !== null)
      await Category.deleteOne({ _id: newCategory._id });
    return utils.SendError(res, 500, null, error);
  }
};

const fetchMyCategories = async (req, res) => {
  try {
    const user = req.user;
    const categories = await Category.find({ user: user._id });
    return utils.SendSuccess(res, 200, null, { categories });
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

const updateCategory = async (req, res) => {
  const user = req.user;
  const { category_id } = req.params;
  const { name, type } = req.body;
  let update = false;
  if (!mongoose.isValidObjectId(category_id))
    return utils.SendError(res, 400, "Invalid category id.");
  try {
    const category = await Category.findById(category_id);
    if (!category) return utils.SendError(res, 404, "Category not found.");
    if (category.user.toString() !== user._id.toString())
      return utils.SendError(res, 401, "You cannot update this category.");
    const oldName = category.name;
    if (name && category.name !== name) {
      category.name = name;
      update = true;
    }
    if (type && category.type !== type) {
      category.type = type;
      update = true;
    }
    if (name && update && oldName !== name)
      await Transaction.updateMany(
        {
          user: user._id,
          category: oldName,
        },
        { $set: { category: name } }
      );
    if (!update) return utils.SendSuccess(res, 200, null, { category });
    await category.save();
    return utils.SendSuccess(res, 200, "Category update successfully.", {
      category,
    });
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

const deleteCategory = async (req, res) => {
  const user = req.user;
  const { category_id } = req.params;
  if (!mongoose.isValidObjectId(category_id))
    return utils.SendError(res, 400, "Invalid category id.");
  try {
    const category = await Category.findById(category_id);
    if (!category) return utils.SendError(res, 404, "Category not found.");
    if (category.user.toString() !== user._id.toString())
      return utils.SendError(res, 401, "You cannot delete this category.");
    const defaultCategory = "Uncategorized";
    await Transaction.updateMany(
      { user: user._id, category: category.name },
      { $set: { category: defaultCategory } }
    );
    await Category.deleteOne({ _id: category._id });
    return utils.SendSuccess(res, 200, "Category delete successfully.");
  } catch (error) {
    return utils.SendError(res, 500, null, error);
  }
};

export default {
  addCategory,
  fetchMyCategories,
  updateCategory,
  deleteCategory,
};
