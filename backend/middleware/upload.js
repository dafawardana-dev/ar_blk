// middleware/upload.js
import multer from "multer";
import path from "path";

const FILE_TYPE = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE[file.mimetype];
    if (!isValid) {
      return cb(new Error("Tipe file tidak diizinkan. Hanya PDF, DOC, DOCX."), false);
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Ubah dari: export const upload = ...
// Menjadi:
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload; // 