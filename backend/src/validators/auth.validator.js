const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;

export const validateRegister = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
}) => {
  const errors = [];

  if (!firstName?.trim()) {
    errors.push("First name is required");
  }

  if (!lastName?.trim()) {
    errors.push("Last name is required");
  }

  if (!email?.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (!phoneNumber?.trim()) {
    errors.push("Phone number is required");
  } else if (!/^\d{10}$/.test(phoneNumber)) {
    errors.push("Phone number must contain 10 digits");
  }

  if (!password) {
    errors.push("Password is required");
  } else if (!passwordRegex.test(password)) {
    errors.push(
      "Password must contain uppercase, lowercase, number and special character",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLogin = ({ email, password }) => {
  const errors = [];

  if (!email?.trim()) {
    errors.push("Email is required");
  }

  if (!password) {
    errors.push("Password is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
