const { Attitude } = require("../DB/db");

async function settingAttitudes(req, res) {
  try {
    let attitudes = await Attitude.findAll();
    attitudes = attitudes.map((att) => att.name);
    res.json(attitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = settingAttitudes;
