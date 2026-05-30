import { Payment } from "../models/payment.model.js";

import { Application } from "../models/application.model.js";

import { APPLICATION_STATUS } from "../constants/application.constants.js";

export const releasePayment = async ({ applicationId, processedBy }) => {
  const application = await Application.findById(applicationId)
    .populate("schemeId")
    .populate("citizenId");

  if (!application) {
    throw new Error("Application not found");
  }

  if (application.status !== APPLICATION_STATUS.APPROVED) {
    throw new Error("Application is not approved");
  }

  const existingPayment = await Payment.findOne({
    applicationId,
  });

  if (existingPayment) {
    throw new Error("Payment already processed");
  }

  const transactionReference = `TXN-${Date.now()}`;

  const payment = await Payment.create({
    applicationId: application._id,

    beneficiaryId: application.citizenId._id,

    schemeId: application.schemeId._id,

    amount: application.schemeId.benefitAmount,

    transactionReference,

    paymentStatus: "SUCCESS",

    processedBy,
  });

  application.status = APPLICATION_STATUS.PAID;

  await application.save();

  return payment;
};

export const getAllPayments = async () => {
  return await Payment.find()
    .populate("beneficiaryId", "firstName lastName")
    .populate("schemeId", "schemeName")
    .sort({
      createdAt: -1,
    });
};

export const getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId)
    .populate("beneficiaryId")
    .populate("schemeId");

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};
