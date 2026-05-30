import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType = req.body.uploadType || "misc";

    let uploadPath = "uploads/misc";

    switch (uploadType) {
      case "profile":
        uploadPath = "uploads/profiles";
        break;

      case "scheme-banner":
        uploadPath = "uploads/schemes/banner";
        break;

      case "scheme-thumbnail":
        uploadPath = "uploads/schemes/thumbnail";
        break;

      case "scheme-gallery":
        uploadPath = "uploads/schemes/gallery";
        break;

      case "scheme-document":
        uploadPath = "uploads/schemes/documents";
        break;

      case "application-document":
        uploadPath = "uploads/applications";
        break;
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",

    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"));
  }
};

export const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
