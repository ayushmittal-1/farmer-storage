const mongoose = require("mongoose");

const storageFacilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    slotAvailability: { type: Number, required: true },
    storageType: { type: String, enum: ["dry", "cold"], required: true }
});

module.exports = mongoose.model("StorageFacility", storageFacilitySchema);
