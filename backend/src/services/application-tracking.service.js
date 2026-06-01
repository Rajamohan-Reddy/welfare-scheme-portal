import { Application } from "../models/application.model.js";

import { ApplicationTimeline } from "../models/application-timeline.model.js";

export const getApplicationTimeline = async ({
  applicationId,
  userId,
  role,
}) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  if (
    role === "CITIZEN" &&
    application.citizenId.toString() !== userId.toString()
  ) {
    throw new Error("Access denied");
  }

  return await ApplicationTimeline.find({
    applicationId,
  })
    .populate("changedBy", "firstName lastName role")
    .sort({
      createdAt: 1,
    });
};
