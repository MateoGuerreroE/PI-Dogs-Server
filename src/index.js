require("dotenv").config();
const server = require("./server");
const { sequelize } = require("./DB/db");
const axios = require("axios");
const PORT = process.env.PORT || 3001;

// Dev

// const endpoint = "http://localhost:3001/temperaments";

// Deploy

const endpoint = "https://pi-dogs-server-mg.up.railway.app/temperaments";

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, "0.0.0.0", () => {
    console.log("Server mounted on port: " + PORT);
    axios.get(endpoint).catch((error) => console.log(error.response.data));
  });
});
