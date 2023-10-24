const { removeDog } = require("../controller");

async function deleteDog(req, res) {
  try {
    const { id } = req.params;
    let response = await removeDog(id);
    if (response) {
      if (response === "notFound")
        return res.status(404).json({
          message: `The dog with ID ${id} was not found on the register`,
        });
      else
        res.json({
          message: "Successfully deleted this dog, click OK to return home",
        });
    } else
      res
        .status(401)
        .json({ message: "The ID provided is not from a created dog" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

module.exports = deleteDog;
