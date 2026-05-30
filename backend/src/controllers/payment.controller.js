import {
  releasePayment,
  getAllPayments,
  getPaymentById,
} from "../services/payment.service.js";

import { successResponse, errorResponse } from "../utils/api-response.js";

export const processPayment = async (req, res) => {
  try {
    const payment = await releasePayment({
      applicationId: req.params.applicationId,

      processedBy: req.user.userId,
    });

    return successResponse({
      res,
      message: "Payment processed successfully",
      data: payment,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await getAllPayments();

    return successResponse({
      res,
      data: payments,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};

export const getPayment = async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);

    return successResponse({
      res,
      data: payment,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
