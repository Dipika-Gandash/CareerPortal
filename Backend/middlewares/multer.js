import multer from "multer";
import path from "path";

const storage =  multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files are allowed"), false);
  }

  cb(null, true);
};

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF allowed"), false);
  }
  cb(null, true);
};

const combinedFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only image and PDF files are allowed"), false);
  }

  cb(null, true);
};

export const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
   limits: {
    fileSize: 2 * 1024 * 1024, 
  },
});

export const uploadResume = multer({
  storage,
  fileFilter: pdfFileFilter,
   limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadFiles = multer({
  storage,
  fileFilter: combinedFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});