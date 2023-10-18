const { getAttitude, settingAttitudes } = require("../controllers");

const attitudeRouter = require("express").Router();

attitudeRouter.get("/", getAttitude);
attitudeRouter.get("/set", settingAttitudes);

module.exports = attitudeRouter;
