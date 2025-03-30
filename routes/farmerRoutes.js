const express = require("express");
const router = express.Router();
const { loginFarmer } = require("../controllers/farmerController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/login", loginFarmer);


module.exports = router;
