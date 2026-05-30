export const validateCreateCategory = (payload) => {
  const errors = [];

  if (!payload.categoryName?.trim()) {
    errors.push("Category name is required");
  }

  if (!payload.categoryCode?.trim()) {
    errors.push("Category code is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUpdateCategory = (payload) => {
  const errors = [];

  if (payload.categoryName !== undefined && !payload.categoryName?.trim()) {
    errors.push("Category name cannot be empty");
  }

  if (payload.categoryCode !== undefined && !payload.categoryCode?.trim()) {
    errors.push("Category code cannot be empty");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
