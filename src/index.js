require("dotenv").config();
const server = require("./server");
const { BACKEND_PORT } = process.env;
const { sequelize } = require("./DB/db");

sequelize.sync({ force: true }).then(() => {
  server.listen(BACKEND_PORT, () =>
    console.log("Server mounted on port: " + BACKEND_PORT)
  );
});
