const StorageFacility = require("../models/storageFacility");

// Add storage facility
exports.addStorageFacility = async (req, res) => {
    const { name, location,capacity, slotAvailability, storageType } = req.body;

    try {
        const newFacility = new StorageFacility({ name, location, capacity, slotAvailability, storageType });
        await newFacility.save();
        res.status(201).json({ message: "Storage facility added successfully", facility: newFacility });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
