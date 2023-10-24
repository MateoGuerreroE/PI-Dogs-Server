const { Attitude } = require("../../DB/db");

async function tempRelation(temperaments) {
  try {
    if (temperaments) {
      let newArr = [];
      for (let i = 0; i < temperaments.length; i++) {
        const matchedTemp = await Attitude.findOne({
          where: { name: temperaments[i] },
        });
        if (matchedTemp) {
          newArr.push(matchedTemp.id);
        }
      }
      return newArr;
    } else throw new Error("Temperament array is undefined");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = tempRelation;
