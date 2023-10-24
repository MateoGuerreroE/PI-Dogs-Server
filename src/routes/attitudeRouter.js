const { getAttitude, settingAttitudes } = require("../handlers");

const attitudeRouter = require("express").Router();

attitudeRouter.get("/", getAttitude);
attitudeRouter.get("/set", settingAttitudes);

module.exports = attitudeRouter;
