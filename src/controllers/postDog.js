const { Dog, Attitude } = require("../DB/db");
const { camelCasing } = require("../helpers");

async function postDog(req, res) {
  try {
    const { name, height, weight, life_span, image, temperament } = req.body;
    if (name && height && weight && life_span && image && temperament) {
      let fixedName = camelCasing(name); // Converting name to Camel Casing.

      // Array destructuring as findOrCreate returns an array
      const [result] = await Dog.findOrCreate({
        where: {
          name: fixedName,
          height: height,
          weight: weight,
          life_span: life_span,
          image: image,
        },
      });

      // Convert each temperament name into its ID in a new array.
      // No map using as this needs to be in order and await inside map throws error

      let newArr = [];
      for (let i = 0; i < temperament.length; i++) {
        const matchedTemp = await Attitude.findOne({
          where: { name: temperament[i] },
        });
        if (matchedTemp) {
          newArr.push(matchedTemp.id);
        }
      }
      // Validates prop inside findOrCreate result which states If data is already
      // on the DB, If so, relate each new record with attitudes on inter table
      if (result._options.isNewRecord) await result.addAttitudes(newArr);
      // Can return anything //! Returning now: Message of successful posting
      return res.json({
        message: "Successfully added dog, click OK to return home",
      });
    } else return res.status(400).json({ message: "Missing information" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = postDog;
