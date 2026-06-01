import bcrypt from "bcryptjs";

export const createOfficerSeedData = async () => {
  const password = await bcrypt.hash("Officer@123", 10);

  return [
    {
      firstName: "Ravi",
      lastName: "Kumar",
      email: "agriculture.officer@ap.gov.in",
      phoneNumber: "9000000001",
      password,
      role: "OFFICER",
      isActive: true,
    },

    {
      firstName: "Suresh",
      lastName: "Reddy",
      email: "education.officer@ap.gov.in",
      phoneNumber: "9000000002",
      password,
      role: "OFFICER",
      isActive: true,
    },

    {
      firstName: "Lakshmi",
      lastName: "Devi",
      email: "health.officer@ap.gov.in",
      phoneNumber: "9000000003",
      password,
      role: "OFFICER",
      isActive: true,
    },

    {
      firstName: "Prasad",
      lastName: "Rao",
      email: "welfare.officer@ap.gov.in",
      phoneNumber: "9000000004",
      password,
      role: "OFFICER",
      isActive: true,
    },
  ];
};
