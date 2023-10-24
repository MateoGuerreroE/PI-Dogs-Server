const { Dog } = require("../../DB/db");
const { camelCasing } = require("../../helpers");

async function dogPosting(info) {
  try {
    const { name, height, weight, life_span, image } = info;
    if (name && height && weight && life_span && image) {
      let fixedName = camelCasing(name);
      let [result] = await Dog.findOrCreate({
        where: {
          name: fixedName,
          height: height,
          weight: weight,
          life_span: life_span,
          image: image,
        },
      });
      if (!result._options.isNewRecord) return null;
      return result;
    } else return "missingInfo";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = dogPosting;
