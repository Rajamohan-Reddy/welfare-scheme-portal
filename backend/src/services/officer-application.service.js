import { Application } from "../models/application.model.js";

export const getOfficerApplications = async ({ status, search }) => {
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
    .populate("citizenId", "firstName lastName phoneNumber aadhaarNumber")
    .populate("schemeId", "schemeName schemeCode department benefitType")
    .sort({
      createdAt: -1,
    });
};

export const getOfficerApplicationById = async (applicationId) => {
  const application = await Application.findById(applicationId)
    .populate(
      "citizenId",
      "firstName lastName email phoneNumber aadhaarNumber address",
    )
    .populate("schemeId")
    .populate("verifiedBy", "firstName lastName role")
    .populate("approvedBy", "firstName lastName role");

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};
