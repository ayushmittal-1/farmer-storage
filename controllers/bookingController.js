const Booking = require("../models/booking");
const StorageFacility = require("../models/storageFacility");

// Book a slot in a storage facility
exports.bookStorageSlot = async (req, res) => {
    const { facilityId, slotCount, paymentMethod } = req.body;
    const farmerId = req.farmerId; // Assuming token middleware sets req.farmerId

    try {
        const facility = await StorageFacility.findById(facilityId);
        if (!facility) return res.status(404).json({ message: "Storage facility not found" });

        if (facility.slotAvailability < slotCount) {
            return res.status(400).json({ message: "Insufficient slot availability" });
        }

        const newBooking = new Booking({ farmerId, facilityId, slotCount, paymentMethod });
        await newBooking.save();

        // Update slot availability
        facility.slotAvailability -= slotCount;
        await facility.save();

        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
