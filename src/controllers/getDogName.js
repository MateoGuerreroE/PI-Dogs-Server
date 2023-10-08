const { Dog } = require("../DB/db");
// const axios = require("axios"); // Only If using API

//* TO ASK
//! IMPORTANT:
// When refering to "it must work for API dogs so for DB dogs" means It may
// have the option to look on the API If needed, or that It NEEDS to search on one,
// and then on the other.
//? IF SO: Should It repeat? If already found on DB - Should It look on API? (viceversa)
//? Which first?

async function getDogName(req, res) {
  try {
    //* TO ASK:
    // For this to receive by query the URL needs to be ?name=..., but required
    // on readme was  /dogs/name?="...", so I filter the breed needed by URL.

    // Taking only params from the URL and setting all to lowercase
    let nameToMatch = req.url // Receiving /name?=%22FirstWord%20SecondWord%22
      .toLowerCase()
      .replace(/%22/g, "") // Removes '%22' of word, leaves /name?=firstword%20secondword
      .slice(req.url.indexOf("=") + 1) // Takes from word after = index, so index + 1
      .split("%20") // Splits into array the two words ignoring '%20' string
      // this sets both words firts letter into capital letter
      .map((word) => {
        let result = word.charAt(0).toUpperCase() + word.slice(1);
        return result;
      }) // result will be [Firstword, Secondword];
      .join(" "); // joins with a space, leaving 'Firstword Secondword'

    //? Using DB

    const result = await Dog.findOne({ where: { name: nameToMatch } });
    if (result) res.json(result);
    else res.status(404).json({ error: "Dog not found" });

    //? Using API

    // const { data } = await axios.get("https://api.thedogapi.com/v1/breeds");
    // const result = data.filter((dog) => dog.name == nameToMatch);
    // res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogName;
