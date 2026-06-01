import { Application } from "../models/application.model.js";

import { APPLICATION_STATUS } from "../constants/application.constants.js";

export const getPendingApplications = async () => {
  return await Application.find({
    status: APPLICATION_STATUS.SUBMITTED,
  })
    .populate("citizenId", "firstName lastName phoneNumber")
    .populate("schemeId", "schemeName schemeCode")
    .sort({
      createdAt: -1,
    });
};

export const getDocumentVerifiedApplications = async () => {
  return await Application.find({
    status: APPLICATION_STATUS.DOCUMENT_VERIFIED,
  })
    .populate("citizenId", "firstName lastName phoneNumber")
    .populate("schemeId", "schemeName schemeCode")
    .sort({
      createdAt: -1,
    });
};

export const getFieldVerifiedApplications = async () => {
  return await Application.find({
    status: APPLICATION_STATUS.FIELD_VERIFIED,
  })
    .populate("citizenId", "firstName lastName phoneNumber")
    .populate("schemeId", "schemeName schemeCode")
    .sort({
      createdAt: -1,
    });
};

export const getApprovedApplications = async () => {
  return await Application.find({
    status: APPLICATION_STATUS.APPROVED,
  })
    .populate("citizenId", "firstName lastName phoneNumber")
    .populate("schemeId", "schemeName schemeCode")
    .sort({
      approvedAt: -1,
    });
};

export const getRejectedApplications = async () => {
  return await Application.find({
    status: APPLICATION_STATUS.REJECTED,
  })
    .populate("citizenId", "firstName lastName phoneNumber")
    .populate("schemeId", "schemeName schemeCode")
    .sort({
      rejectedAt: -1,
    });
};
