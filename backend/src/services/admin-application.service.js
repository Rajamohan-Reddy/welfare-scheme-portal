import { Application } from "../models/application.model.js";

export const getAdminApplications = async ({
  status,
  search,
  page = 1,
  limit = 20,
}) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.applicationNumber = {
      $regex: search,
      $options: "i",
    };
  }

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .populate("citizenId", "firstName lastName phoneNumber")
      .populate("schemeId", "schemeName schemeCode department")
      .populate("verifiedBy", "firstName lastName")
      .populate("approvedBy", "firstName lastName")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit),

    Application.countDocuments(filter),
  ]);

  return {
    applications,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAdminApplicationById = async (applicationId) => {
  const application = await Application.findById(applicationId)
    .populate("citizenId")
    .populate("schemeId")
    .populate("verifiedBy", "firstName lastName role")
    .populate("approvedBy", "firstName lastName role");

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};

export const getApplicationStatistics = async () => {
  const [
    totalApplications,
    submitted,
    documentVerified,
    fieldVerified,
    approved,
    rejected,
    paid,
  ] = await Promise.all([
    Application.countDocuments(),

    Application.countDocuments({
      status: "SUBMITTED",
    }),

    Application.countDocuments({
      status: "DOCUMENT_VERIFIED",
    }),

    Application.countDocuments({
      status: "FIELD_VERIFIED",
    }),

    Application.countDocuments({
      status: "APPROVED",
    }),

    Application.countDocuments({
      status: "REJECTED",
    }),

    Application.countDocuments({
      status: "PAID",
    }),
  ]);

  return {
    totalApplications,
    submitted,
    documentVerified,
    fieldVerified,
    approved,
    rejected,
    paid,
  };
};
