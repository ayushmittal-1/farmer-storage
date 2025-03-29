const express = require("express");
const { addStorageFacility } = require("../controllers/storageController");
const router = express.Router();

router.post("/add", addStorageFacility);

module.exports = router;
