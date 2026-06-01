export const validateChangePassword = ({ currentPassword, newPassword }) => {
  const errors = [];

  if (!currentPassword) {
    errors.push("Current password is required");
  }

  if (!newPassword) {
    errors.push("New password is required");
  }

  if (newPassword && newPassword.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
