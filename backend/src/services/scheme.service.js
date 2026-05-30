import { Scheme } from "../models/scheme.model.js";

import { createAuditLog } from "./audit-log.service.js";

import { AUDIT_MODULES, AUDIT_ACTIONS } from "../constants/audit.constants.js";

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

  await createAuditLog({
    module: AUDIT_MODULES.SCHEME,

    action: AUDIT_ACTIONS.CREATE,

    entityId: scheme._id,

    performedBy: payload.createdBy,

    description: `Scheme ${scheme.schemeName} created`,
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

  await createAuditLog({
    module: AUDIT_MODULES.SCHEME,

    action: AUDIT_ACTIONS.UPDATE,

    entityId: scheme._id,

    performedBy: payload.updatedBy,

    description: `Scheme ${scheme.schemeName} updated`,
  });

  return scheme;
};

export const deleteScheme = async (schemeId, deletedBy) => {
  const scheme = await Scheme.findByIdAndDelete(schemeId);

  if (!scheme) {
    throw new Error("Scheme not found");
  }

  await createAuditLog({
    module: AUDIT_MODULES.SCHEME,

    action: AUDIT_ACTIONS.DELETE,

    entityId: scheme._id,

    performedBy: deletedBy,

    description: `Scheme ${scheme.schemeName} deleted`,
  });

  return true;
};
