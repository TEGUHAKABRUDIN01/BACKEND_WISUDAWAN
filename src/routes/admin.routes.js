const express = require("express");
const {
  getProsesWisudaHandler,
  approveWisuda,
} = require("../controllers/admin.controller");

const router = express.Router();

// lihat wisudawan menunggu ACC
router.get("/wisuda", getProsesWisudaHandler);

// approve / reject
router.put("/wisuda/approve", approveWisuda);

module.exports = router;
