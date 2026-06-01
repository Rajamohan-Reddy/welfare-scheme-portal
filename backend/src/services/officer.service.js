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

export const getOfficerStatistics = async () => {
  const [
    pendingApplications,
    documentVerified,
    fieldVerified,
    approvedApplications,
    rejectedApplications,
  ] = await Promise.all([
    Application.countDocuments({
      status: APPLICATION_STATUS.SUBMITTED,
    }),

    Application.countDocuments({
      status: APPLICATION_STATUS.DOCUMENT_VERIFIED,
    }),

    Application.countDocuments({
      status: APPLICATION_STATUS.FIELD_VERIFIED,
    }),

    Application.countDocuments({
      status: APPLICATION_STATUS.APPROVED,
    }),

    Application.countDocuments({
      status: APPLICATION_STATUS.REJECTED,
    }),
  ]);

  return {
    pendingApplications,
    documentVerified,
    fieldVerified,
    approvedApplications,
    rejectedApplications,
  };
};
