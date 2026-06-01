import { Application } from "../models/application.model.js";

export const getAdminApplications = async ({ status, search }) => {
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

  return await Application.find(filter)
    .populate("citizenId", "firstName lastName phoneNumber")
    .populate("schemeId", "schemeName schemeCode department")
    .populate("verifiedBy", "firstName lastName")
    .populate("approvedBy", "firstName lastName")
    .sort({
      createdAt: -1,
    });
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
