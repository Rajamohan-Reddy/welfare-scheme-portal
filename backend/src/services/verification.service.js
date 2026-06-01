import { Application } from "../models/application.model.js";

import { VerificationHistory } from "../models/verification-history.model.js";
import { ApplicationTimeline } from "../models/application-timeline.model.js";
import { APPLICATION_STATUS } from "../constants/application.constants.js";

import { VERIFICATION_ACTIONS } from "../constants/verification.constants.js";

import { createNotification } from "./notification.service.js";

import { createAuditLog } from "./audit-log.service.js";

import { AUDIT_MODULES, AUDIT_ACTIONS } from "../constants/audit.constants.js";

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

  await ApplicationTimeline.create({
    applicationId: application._id,

    oldStatus: APPLICATION_STATUS.SUBMITTED,

    newStatus: APPLICATION_STATUS.DOCUMENT_VERIFIED,

    remarks: remarks || "Documents verified",

    changedBy: officerId,
  });

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.DOCUMENT_VERIFY,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.DOCUMENT_VERIFIED,

    performedBy: officerId,
  });

  await createAuditLog({
    module: AUDIT_MODULES.VERIFICATION,

    action: AUDIT_ACTIONS.VERIFY,

    entityId: application._id,

    performedBy: officerId,

    description: "Document verification completed",
  });

  await createNotification({
    userId: application.citizenId,

    title: "Document Verification Completed",

    message: "Your submitted documents have been verified successfully.",

    referenceType: "APPLICATION",

    referenceId: application._id,
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

  await ApplicationTimeline.create({
    applicationId: application._id,

    oldStatus: APPLICATION_STATUS.DOCUMENT_VERIFIED,

    newStatus: APPLICATION_STATUS.FIELD_VERIFIED,

    remarks: remarks || "Field verification completed",

    changedBy: officerId,
  });

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.FIELD_VERIFY,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.FIELD_VERIFIED,

    performedBy: officerId,
  });

  await createAuditLog({
    module: AUDIT_MODULES.VERIFICATION,

    action: AUDIT_ACTIONS.VERIFY,

    entityId: application._id,

    performedBy: officerId,

    description: "Field verification completed",
  });

  await createNotification({
    userId: application.citizenId,

    title: "Field Verification Completed",

    message: "Field verification has been completed successfully.",

    referenceType: "APPLICATION",

    referenceId: application._id,
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

  await ApplicationTimeline.create({
    applicationId: application._id,

    oldStatus: APPLICATION_STATUS.FIELD_VERIFIED,

    newStatus: APPLICATION_STATUS.APPROVED,

    remarks: remarks || "Application approved",

    changedBy: adminId,
  });

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.APPROVE,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.APPROVED,

    performedBy: adminId,
  });

  await createAuditLog({
    module: AUDIT_MODULES.VERIFICATION,

    action: AUDIT_ACTIONS.APPROVE,

    entityId: application._id,

    performedBy: adminId,

    description: "Application approved",
  });

  await createNotification({
    userId: application.citizenId,

    title: "Application Approved",

    message: "Congratulations! Your application has been approved.",

    referenceType: "APPLICATION",

    referenceId: application._id,
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

  await ApplicationTimeline.create({
    applicationId: application._id,

    oldStatus: previousStatus,

    newStatus: APPLICATION_STATUS.REJECTED,

    remarks: remarks || "Application rejected",

    changedBy: adminId,
  });

  await VerificationHistory.create({
    applicationId,

    action: VERIFICATION_ACTIONS.REJECT,

    remarks,

    previousStatus,

    currentStatus: APPLICATION_STATUS.REJECTED,

    performedBy: adminId,
  });

  await createAuditLog({
    module: AUDIT_MODULES.VERIFICATION,

    action: AUDIT_ACTIONS.REJECT,

    entityId: application._id,

    performedBy: adminId,

    description: "Application rejected",
  });

  await createNotification({
    userId: application.citizenId,

    title: "Application Rejected",

    message: remarks || "Your application has been rejected.",

    referenceType: "APPLICATION",

    referenceId: application._id,
  });

  return application;
};
