const { getDogByName } = require("../controller");
const { camelCasing } = require("../helpers");

// Made It so If no data found on DB, search on API.

async function getDogName(req, res) {
  try {
    // README REQUESTED /name?="" instead of /?name="...", so wont be received per query.
    let nameToMatch = camelCasing(req.url);

    const result = await getDogByName(nameToMatch);
    if (result) res.json(result);
    else res.status(404).json({ message: "Breed name not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getDogName;
