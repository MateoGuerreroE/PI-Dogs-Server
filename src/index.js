require("dotenv").config();
const server = require("./server");
const { BACKEND_PORT } = process.env;
const { sequelize } = require("./DB/db");
const axios = require("axios");

sequelize.sync({ force: false }).then(() => {
  server.listen(BACKEND_PORT, () => {
    console.log("Server mounted on port: " + BACKEND_PORT);
    axios
      .get(`http://localhost:3001/temperaments`)
      .catch((error) => console.log(error));
  });
});
