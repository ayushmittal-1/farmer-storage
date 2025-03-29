// routes/authRoutes.js
const express = require("express");
const { registerFarmer, loginFarmer } = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");


router.post("/register", registerFarmer);
router.post("/login", loginFarmer);
// router.get("/profile", profile);
router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Welcome to your profile", farmerId: req.farmerId });
});


module.exports = router;
