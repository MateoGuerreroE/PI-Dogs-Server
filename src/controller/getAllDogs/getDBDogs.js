const { Dog, Attitude } = require("../../DB/db");

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
    let result = rawResult.map((breed) => {
      const temperament = breed.Attitudes.map((att) => att.name);
      return {
        id: breed.id,
        name: breed.name,
        height: breed.height,
        weight: breed.weight,
        life_span: breed.life_span,
        image: breed.image,
        temperament: temperament,
        created: true,
      };
    });

    return result.reverse();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getDBDogs;
