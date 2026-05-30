import { SchemeCategory } from "../models/scheme-category.model.js";

export const createCategory = async (payload) => {
  const existingCategory = await SchemeCategory.findOne({
    categoryCode: payload.categoryCode.toUpperCase(),
  });

  if (existingCategory) {
    throw new Error("Category code already exists");
  }

  return await SchemeCategory.create({
    ...payload,
    categoryCode: payload.categoryCode.toUpperCase(),
  });
};

export const getAllCategories = async () => {
  return await SchemeCategory.find().sort({
    categoryName: 1,
  });
};

export const getCategoryById = async (categoryId) => {
  const category = await SchemeCategory.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (categoryId, payload) => {
  const category = await SchemeCategory.findByIdAndUpdate(categoryId, payload, {
    new: true,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const deleteCategory = async (categoryId) => {
  const category = await SchemeCategory.findByIdAndDelete(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return true;
};
