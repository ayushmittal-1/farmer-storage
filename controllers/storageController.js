const StorageFacility = require("../models/storageFacility");
//



//ye jis collevtion me store kr raha h vo ham kaam m nahi le rahe]
// to ye add pe api call nhi krni h





//
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
