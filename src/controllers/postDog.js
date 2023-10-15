const { Dog, Attitude } = require("../DB/db");

async function postDog(req, res) {
  try {
    const { name, height, weight, life_span, image, temperament } = req.body;
    if (name && height && weight && life_span && image && temperament) {
      // This will convert name to Name format.
      let fixedName = name
        .toLowerCase()
        .split(" ")
        .map((word) => {
          let result = word.charAt(0).toUpperCase() + word.slice(1);
          return result;
        })
        .join(" ");
      // fixedName = fixedName.charAt(0).toUpperCase() + fixedName.slice(1);
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

      // Can return anything //! Returning now: Message of successful posting
      res.json({ message: "Successfully added dog" });
    } else res.status(400).json({ error: "Faltan parametros" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = postDog;
