const { Dog } = require("../DB/db");
const { validateUUID } = require("../helpers");

async function removeDog(id) {
  try {
    if (!validateUUID(id)) {
      return false;
    } else {
      const response = await Dog.destroy({ where: { id: id } });
      if (response) {
        return true;
      } else {
        return "notFound";
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = removeDog;
