const { dogPosting, tempRelation } = require("../controller");

async function postDog(req, res) {
  try {
    let result = await dogPosting(req.body);
    if (result) {
      if (result === "missingInfo")
        return res.status(400).json({
          message: "Some dog information is missing",
        });
      const { temperament } = req.body;
      let temperamentsToRelate = await tempRelation(temperament);
      await result.addAttitudes(temperamentsToRelate);
      res.json({ message: "Successfully added dog, click OK to return home" });
    } else res.status(405).json({ message: "Dog already exists" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = postDog;
