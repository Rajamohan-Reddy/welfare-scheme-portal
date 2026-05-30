export const validateCreateApplication = (data) => {
  const errors = [];

  if (!data.schemeId) {
    errors.push("Scheme is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
