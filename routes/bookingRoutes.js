const express = require("express");
const { bookStorageSlot } = require("../controllers/bookingController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/book", verifyToken, bookStorageSlot);

module.exports = router;
