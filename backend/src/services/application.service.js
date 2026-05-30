import { Application } from "../models/application.model.js";

import { Scheme } from "../models/scheme.model.js";

import { createNotification } from "./notification.service.js";

import { createAuditLog } from "./audit-log.service.js";

import { AUDIT_MODULES, AUDIT_ACTIONS } from "../constants/audit.constants.js";

export const generateApplicationNumber = () => {
  const timestamp = Date.now();

  return `APP-${timestamp}`;
};

export const createApplication = async ({
  citizenId,
  schemeId,
  documents = [],
  dynamicFormData = {},
  applicantRemarks,
}) => {
  const scheme = await Scheme.findById(schemeId);

  if (!scheme) {
    throw new Error("Scheme not found");
  }

  const application = await Application.create({
    applicationNumber: generateApplicationNumber(),

    citizenId,

    schemeId,

    documents,

    dynamicFormData,

    applicantRemarks,
  });

  await createAuditLog({
    module: AUDIT_MODULES.APPLICATION,

    action: AUDIT_ACTIONS.CREATE,

    entityId: application._id,

    performedBy: citizenId,

    description: `Application ${application.applicationNumber} submitted`,
  });

  await createNotification({
    userId: citizenId,

    title: "Application Submitted",

    message: `Your application ${application.applicationNumber} has been submitted successfully.`,

    referenceType: "APPLICATION",

    referenceId: application._id,
  });

  return application;
};

export const getCitizenApplications = async (citizenId) => {
  return await Application.find({
    citizenId,
  })
    .populate("schemeId", "schemeName schemeCode")
    .sort({
      createdAt: -1,
    });
};

export const getApplicationById = async (applicationId) => {
  const application = await Application.findById(applicationId)
    .populate("citizenId", "firstName lastName email")
    .populate("schemeId");

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};
