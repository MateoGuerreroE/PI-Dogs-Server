const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Dog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z\s]*$/,
      },
      unique: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d+\s*-\s*\d+$/,
      },
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d+\s*-\s*\d+$/,
      },
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d+\s*-\s*\d+\s*years$/,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
