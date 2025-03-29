const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("Farmer", farmerSchema);
