const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: "StorageFacility", required: true },
    slotCount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["online", "cash"], required: true },
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
