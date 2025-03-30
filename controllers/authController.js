// authController.js
const jwt = require("jsonwebtoken");
const Farmer = require("../models/farmer");

exports.registerFarmer = async (req, res) => {
    const { name, contact, password } = req.body;
    try {
        const newFarmer = new Farmer({ name, contact, password });
        await newFarmer.save();
        res.status(201).json({ message: "Farmer registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginFarmer = async (req, res) => {
    const { contact, password } = req.body;
    try {
        const farmer = await Farmer.findOne({ contact });
        if (!farmer) return res.status(400).json({ message: "Farmer not found" });

        // Check password (bcrypt should be used, but since we skipped it, direct comparison for now)
        if (password !== farmer.password) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign(
            { farmerId: farmer._id }, // Payload with farmer ID
            process.env.JWT_SECRET,    // Secret key from .env
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }  // Token expiration time
        );

        // Send the response with token
        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

