import { BENEFIT_TYPES } from "../constants/scheme.constants.js";

export const validateCreateScheme = (data) => {
  const errors = [];

  if (!data.schemeCode?.trim()) {
    errors.push("Scheme code is required");
  }

  if (!data.schemeName?.trim()) {
    errors.push("Scheme name is required");
  }

  if (!data.description?.trim()) {
    errors.push("Description is required");
  }

  if (!data.department?.trim()) {
    errors.push("Department is required");
  }

  if (!data.categoryId) {
    errors.push("Category is required");
  }

  if (!data.benefitType) {
    errors.push("Benefit type is required");
  }

  if (
    data.benefitType &&
    !Object.values(BENEFIT_TYPES).includes(data.benefitType)
  ) {
    errors.push("Invalid benefit type");
  }

  if (!data.startDate) {
    errors.push("Start date is required");
  }

  if (!data.endDate) {
    errors.push("End date is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUpdateScheme = (data) => {
  const errors = [];

  if (
    data.benefitType &&
    !Object.values(BENEFIT_TYPES).includes(data.benefitType)
  ) {
    errors.push("Invalid benefit type");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
