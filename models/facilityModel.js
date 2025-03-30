const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    capacity: {
      type: Number,
      required: true,
    },
    slotAvailability: {
      type: Number,
      required: true,
    },
    storageType: {
      type: String,
      enum: ["cold", "dry"], // Assuming you have two types
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facility", facilitySchema);
