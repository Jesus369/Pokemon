"use strict";

const bcrypt = require("../app.js").bcrypt;

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
    users.belongsToMany(models.pokemon, {
      through: "usertopokemon",
      foreignKey: "userid"
    });
  };

  return users;
};
