import { Scheme } from "../models/scheme.model.js";

export const createScheme = async (payload) => {
  const existingScheme = await Scheme.findOne({
    schemeCode: payload.schemeCode.toUpperCase(),
  });

  if (existingScheme) {
    throw new Error("Scheme code already exists");
  }

  const scheme = await Scheme.create({
    ...payload,

    schemeCode: payload.schemeCode.toUpperCase(),
  });

  return scheme;
};

export const getAllSchemes = async () => {
  return await Scheme.find()
    .populate("categoryId", "categoryName categoryCode")
    .populate("createdBy", "firstName lastName")
    .sort({
      createdAt: -1,
    });
};

export const getSchemeById = async (schemeId) => {
  const scheme = await Scheme.findById(schemeId)
    .populate("categoryId")
    .populate("createdBy", "firstName lastName");

  if (!scheme) {
    throw new Error("Scheme not found");
  }

  return scheme;
};

export const updateScheme = async (schemeId, payload) => {
  const scheme = await Scheme.findByIdAndUpdate(schemeId, payload, {
    new: true,
  });

  if (!scheme) {
    throw new Error("Scheme not found");
  }

  return scheme;
};

export const deleteScheme = async (schemeId) => {
  const scheme = await Scheme.findByIdAndDelete(schemeId);

  if (!scheme) {
    throw new Error("Scheme not found");
  }

  return true;
};
