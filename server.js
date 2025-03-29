require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const storageRoutes = require("./routes/storageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use("/api/auth", authRoutes);



app.use("/api/storage", storageRoutes);


app.use("/api/booking", bookingRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
