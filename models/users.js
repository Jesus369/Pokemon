"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    "users",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      bio: DataTypes.STRING,
      age: DataTypes.INTEGER,
      image: DataTypes.STRING,
      hometown: DataTypes.STRING
    },
    {
      hooks: {
        afterValidate: async user => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        }
      }
    }
  );

  users.associate = models => {
    // Pokemon captured by the user
    users.belongsToMany(models.pokemon, {
      through: "usertopokemon",
      foreignKey: "userid"
    });

    // Pokemon belonging to the user's team
    users.belongsToMany(models.pokemon, {
      through: "currentsix",
      foreignKey: "iduser"
    });
  };

  return users;
};
