import { successResponse, errorResponse } from "../utils/api-response.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse({
        res,
        statusCode: 400,
        message: "No file uploaded",
      });
    }

    return successResponse({
      res,
      message: "File uploaded successfully",

      data: {
        fileName: req.file.filename,

        originalName: req.file.originalname,

        path: req.file.path.replace(/\\/g, "/"),

        size: req.file.size,
      },
    });
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
    });
  }
};
