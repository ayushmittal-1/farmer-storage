const express = require("express");
const Facility = require("../models/facilityModel");
const router = express.Router();

// Get facilities by type
router.get("/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude and longitude are required." });
        }

        // Get all facilities of the given type
        const facilities = await Facility.find({ storageType: type });

        // Function to calculate distance between two coordinates (Haversine formula)
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRadians = (degree) => (degree * Math.PI) / 180;
            const R = 6371; // Earth's radius in kilometers

            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c * 1000; // Convert to meters
        };

        // Filter facilities within 2 km
        const nearbyFacilities = facilities.filter(facility => {
            const distance = calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                facility.location.latitude,
                facility.location.longitude
            );
            return distance <= 2000; // 2 km range
        });

        res.json(nearbyFacilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add a new facility
router.post("/", async (req, res) => {
    try {
        const { name, location, capacity, slotAvailability, storageType } = req.body;
        
        // Creating a new facility object
        const newFacility = new Facility({
            name,
            location,
            capacity,
            slotAvailability,
            storageType,
        });

        // Save the facility to the database
        await newFacility.save();
        res.status(201).json({ message: "Facility added successfully", facility: newFacility });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
