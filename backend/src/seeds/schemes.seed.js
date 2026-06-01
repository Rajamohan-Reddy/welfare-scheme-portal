export const SCHEMES_MASTER = [
  {
    schemeCode: "YSR-RYTHU",
    schemeName: "YSR Rythu Bharosa",
    categoryCode: "AGR",
    department: "Agriculture Department",
    benefitType: "DIRECT_BENEFIT_TRANSFER",
    benefitAmount: 13500,

    bannerImage: "/uploads/schemes/ysr-rythu/banner.jpg",

    thumbnailImage: "/uploads/schemes/ysr-rythu/thumb.jpg",

    guidelinesDocument: "/uploads/documents/ysr-rythu-guidelines.pdf",

    governmentOrderDocument: "/uploads/documents/ysr-rythu-go.pdf",

    description:
      "Financial support to eligible farmers for agricultural activities.",

    requiredDocuments: [
      "Aadhaar Card",
      "Land Ownership Document",
      "Bank Passbook",
    ],

    applicationFields: [
      "aadhaarNumber",
      "landSurveyNumber",
      "bankAccountNumber",
    ],

    eligibility: {
      farmerRequired: true,
      maxAnnualIncome: 500000,
    },
  },

  {
    schemeCode: "JVD",
    schemeName: "Jagananna Vidya Deevena",
    categoryCode: "EDU",
    department: "Higher Education Department",
    benefitType: "SCHOLARSHIP",
    benefitAmount: 20000,

    bannerImage: "/uploads/schemes/jvd/banner.jpg",

    thumbnailImage: "/uploads/schemes/jvd/thumb.jpg",

    guidelinesDocument: "/uploads/documents/jvd-guidelines.pdf",

    governmentOrderDocument: "/uploads/documents/jvd-go.pdf",

    description: "Scholarship support for higher education students.",

    requiredDocuments: ["Aadhaar Card", "Student ID", "Income Certificate"],

    applicationFields: ["collegeName", "courseName", "studentId"],

    eligibility: {
      studentRequired: true,
      maxAnnualIncome: 800000,
    },
  },

  {
    schemeCode: "JVASATHI",
    schemeName: "Jagananna Vasathi Deevena",
    categoryCode: "EDU",
    department: "Higher Education Department",
    benefitType: "SCHOLARSHIP",
    benefitAmount: 10000,
    bannerImage: "/uploads/schemes/jvasathi/banner.jpg",
    thumbnailImage: "/uploads/schemes/jvasathi/thumb.jpg",
    description: "Support for hostel and living expenses of students.",
    requiredDocuments: ["Aadhaar Card", "Student ID"],
    applicationFields: ["collegeName", "studentId"],
    eligibility: {
      studentRequired: true,
    },
  },

  {
    schemeCode: "AAROGYASRI",
    schemeName: "YSR Aarogyasri",
    categoryCode: "HEA",
    department: "Health Department",
    benefitType: "HEALTH_ASSISTANCE",
    benefitAmount: 500000,
    bannerImage: "/uploads/schemes/aarogyasri/banner.jpg",
    thumbnailImage: "/uploads/schemes/aarogyasri/thumb.jpg",
    description:
      "Medical assistance and health coverage for eligible families.",
    requiredDocuments: ["Aadhaar Card", "Income Certificate"],
    applicationFields: ["healthCardNumber"],
    eligibility: {},
  },

  {
    schemeCode: "CHEYUTHA",
    schemeName: "YSR Cheyutha",
    categoryCode: "WCD",
    department: "Women Development Department",
    benefitType: "DIRECT_BENEFIT_TRANSFER",
    benefitAmount: 18750,
    bannerImage: "/uploads/schemes/cheyutha/banner.jpg",
    thumbnailImage: "/uploads/schemes/cheyutha/thumb.jpg",
    description: "Financial assistance for women beneficiaries.",
    requiredDocuments: ["Aadhaar Card", "Bank Passbook"],
    applicationFields: ["occupation"],
    eligibility: {
      gender: ["FEMALE"],
    },
  },

  {
    schemeCode: "ASARA",
    schemeName: "YSR Asara",
    categoryCode: "WCD",
    department: "Women Development Department",
    benefitType: "LOAN_ASSISTANCE",
    benefitAmount: 75000,
    bannerImage: "/uploads/schemes/asara/banner.jpg",
    thumbnailImage: "/uploads/schemes/asara/thumb.jpg",
    description: "Loan relief and financial assistance.",
    requiredDocuments: ["Aadhaar Card"],
    applicationFields: ["selfHelpGroupName"],
    eligibility: { gender: ["FEMALE"] },
  },

  {
    schemeCode: "PENSION",
    schemeName: "YSR Pension Kanuka",
    categoryCode: "SOC",
    department: "Social Welfare Department",
    benefitType: "PENSION",
    benefitAmount: 3000,
    bannerImage: "/uploads/schemes/pension/banner.jpg",
    thumbnailImage: "/uploads/schemes/pension/thumb.jpg",
    description: "Monthly pension assistance.",
    requiredDocuments: ["Aadhaar Card"],
    applicationFields: ["age"],
    eligibility: { minAge: 60 },
  },

  {
    schemeCode: "HOUSING",
    schemeName: "Jagananna Housing Scheme",
    categoryCode: "HOU",
    department: "Housing Department",
    benefitType: "HOUSING_ASSISTANCE",
    benefitAmount: 180000,
    bannerImage: "/uploads/schemes/housing/banner.jpg",
    thumbnailImage: "/uploads/schemes/housing/thumb.jpg",
    description: "Affordable housing support.",
    requiredDocuments: ["Aadhaar Card", "Income Certificate"],
    applicationFields: ["currentAddress"],
    eligibility: {},
  },

  {
    schemeCode: "KAPU",
    schemeName: "YSR Kapu Nestham",
    categoryCode: "BCW",
    department: "Backward Classes Welfare",
    benefitType: "DIRECT_BENEFIT_TRANSFER",
    benefitAmount: 15000,
    bannerImage: "/uploads/schemes/kapu/banner.jpg",
    thumbnailImage: "/uploads/schemes/kapu/thumb.jpg",
    description: "Financial assistance to Kapu women.",
    requiredDocuments: ["Aadhaar Card"],
    applicationFields: ["casteCertificate"],
    eligibility: { gender: ["FEMALE"] },
  },

  {
    schemeCode: "MATSYA",
    schemeName: "YSR Matsyakara Bharosa",
    categoryCode: "AGR",
    department: "Fisheries Department",
    benefitType: "DIRECT_BENEFIT_TRANSFER",
    benefitAmount: 10000,
    bannerImage: "/uploads/schemes/matsya/banner.jpg",
    thumbnailImage: "/uploads/schemes/matsya/thumb.jpg",
    description: "Support for fishermen during fishing ban period.",
    requiredDocuments: ["Aadhaar Card"],
    applicationFields: ["boatRegistrationNumber"],
    eligibility: {},
  },

  // Add 5 more similarly:
  // Vahana Mitra
  // Vidya Kanuka
  // Nadu Nedu
  // Ambedkar Overseas Education
  // Skill Development Assistance
];
