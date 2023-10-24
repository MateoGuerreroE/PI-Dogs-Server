require("dotenv").config();
const server = require("./server");
const { sequelize } = require("./DB/db");
const axios = require("axios");
const port = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  server.listen(port, "0.0.0.0", () => {
    console.log("Server mounted on port: " + port);
    axios
      .get(`https://pi-dogs-server-mg.up.railway.app/temperaments`)
      .catch((error) => console.log(error.response.data));
  });
});
