const { Dog, Attitude } = require("../DB/db");

async function postDog(req, res) {
  try {
    const { id, name, height, weight, life_span, image, temperament } =
      req.body;
    if (id && name && height && weight && life_span && image && temperament) {
      // Array destructuring as findOrCreate returns an array
      const [result] = await Dog.findOrCreate({
        where: {
          id: id,
          name: name,
          height: height.metric,
          weight: weight.metric,
          life_span: life_span,
          image: image.url,
        },
      });

      // Set string of temperament as an array
      let temperamentList = temperament.split(", ");

      // Convert each temperament name into its ID in a new array.
      // No map using as this needs to be in order and await inside map throws error

      let newArr = [];
      for (let i = 0; i < temperamentList.length; i++) {
        const matchedTemp = await Attitude.findOne({
          where: { name: temperamentList[i] },
        });
        if (matchedTemp) {
          newArr.push(matchedTemp.id);
        }
      }
      // Validates prop inside findOrCreate result which states If data is already
      // on the DB, If so, relate each new record with attitudes on inter table
      if (result._options.isNewRecord) await result.addAttitudes(newArr);

      // Can return anything //! Returning now: all info on Dogs
      res.json(await Dog.findAll());
    } else res.status(400).json({ error: "Faltan parametros" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = postDog;
