import { Application } from "../models/application.model.js";

import { VerificationHistory } from "../models/verification-history.model.js";

import { APPLICATION_STATUS } from "../constants/application.constants.js";

import { VERIFICATION_ACTIONS } from "../constants/verification.constants.js";

export const documentVerifyApplication = async ({
  applicationId,
  officerId,
  remarks,
}) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const previousStatus = application.status;

  application.status = APPLICATION_STATUS.DOCUMENT_VERIFIED;

  application.officerRemarks = remarks;

  application.verifiedBy = officerId;

  await application.save();

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.DOCUMENT_VERIFY,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.DOCUMENT_VERIFIED,

    performedBy: officerId,
  });

  return application;
};

export const fieldVerifyApplication = async ({
  applicationId,
  officerId,
  remarks,
}) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const previousStatus = application.status;

  application.status = APPLICATION_STATUS.FIELD_VERIFIED;

  application.officerRemarks = remarks;

  await application.save();

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.FIELD_VERIFY,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.FIELD_VERIFIED,

    performedBy: officerId,
  });

  return application;
};

export const approveApplication = async ({
  applicationId,
  adminId,
  remarks,
}) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const previousStatus = application.status;

  application.status = APPLICATION_STATUS.APPROVED;

  application.approvedAt = new Date();

  application.approvedBy = adminId;

  application.officerRemarks = remarks;

  await application.save();

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.APPROVE,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.APPROVED,

    performedBy: adminId,
  });

  return application;
};

export const rejectApplication = async ({
  applicationId,
  adminId,
  remarks,
}) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  const previousStatus = application.status;

  application.status = APPLICATION_STATUS.REJECTED;

  application.rejectedAt = new Date();

  application.rejectionReason = remarks;

  await application.save();

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.REJECT,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.REJECTED,

    performedBy: adminId,
  });

  return application;
};
