const express = require("express");
const prodi = require("../controllers/prodi.controller.js");

const router = express.Router();

// routes
router.get("/prodi", prodi);

module.exports = router;
