const express = require("express");
const upload = require("../middleware/upload.js");
const {
  registerMahasiswa,
  login,
  loginPetugas,
} = require("../controllers/auth.controller.js");

const router = express.Router();

// routes
router.post(
  "/auth/registrasi/mahasiswa",
  upload.single("sk_wisuda"),
  registerMahasiswa
);
router.post("/auth/login/mahasiswa", login);
router.post("/auth/login/petugas", loginPetugas);

module.exports = router;
