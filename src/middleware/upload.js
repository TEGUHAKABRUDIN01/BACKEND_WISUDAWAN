const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../../uploads/sk");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqeName = Date.now() + "-" + file.originalname;
    cb(null, uniqeName);
  },
});

const filterFile = (req, file, cb) => {
  const formatFile = [".pdf", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase;

  if (!allowed.includes(ext)) {
    return cb(new Error("Format file tidak didukung!!!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  filterFile,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
