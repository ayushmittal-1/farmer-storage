const express = require("express");
const { bookStorageSlot, getFarmerBookings } = require("../controllers/bookingController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/book", verifyToken, bookStorageSlot);

// Use verifyToken instead of authenticate
router.get("/mybookings/:farmerId", verifyToken, getFarmerBookings);

module.exports = router;
