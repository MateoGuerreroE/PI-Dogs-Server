const { Dog, Attitude } = require("../../DB/db");
const { dbDataConverter } = require("../../helpers");

async function getDBDogs() {
  try {
    const rawResult = await Dog.findAll({
      include: [
        {
          model: Attitude,
          attributes: ["name", "id"],
        },
      ],
    });
    let result = rawResult.map((breed) => dbDataConverter(breed)); //! Added

    return result.reverse();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getDBDogs;
