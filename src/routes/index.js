const { Router } = require("express");
const dogsRouter = require("./dogsRouter");
const attitudeRouter = require("./attitudeRouter");

const router = Router();

// Modularized routes
router.use("/dogs", dogsRouter);
router.use("/temperaments", attitudeRouter);

module.exports = router;
