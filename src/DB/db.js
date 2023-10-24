require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const { DogModel, AttitudeModel } = require("./models");

// Sequelize

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
  DB_DEPLOY,
  {
    logging: false, // Set to disable SQL log on console
    native: false, // Taken from base repo
  }
);

// Creating Tables on DB

DogModel(sequelize);
AttitudeModel(sequelize);

// Relations

const { Dog, Attitude } = sequelize.models;

Dog.belongsToMany(Attitude, { through: "dog_attitude" });
Attitude.belongsToMany(Dog, { through: "dog_attitude" });

module.exports = {
  ...sequelize.models,
  sequelize,
};
