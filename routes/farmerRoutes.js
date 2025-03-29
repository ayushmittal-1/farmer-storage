const express = require("express");
const router = express.Router();
const { loginFarmer } = require("../controllers/farmerController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/login", loginFarmer);

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Welcome to your profile", farmerId: req.farmerId });
});

module.exports = router;
