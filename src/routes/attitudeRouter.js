const { getAttitude } = require("../controllers");

const attitudeRouter = require("express").Router();

attitudeRouter.get("/", getAttitude);

module.exports = attitudeRouter;
