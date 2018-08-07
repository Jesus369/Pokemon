"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("currentsixes", "idpoke", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "pokemons",
          key: "id"
        }
      }),
      queryInterface.addColumn("currentsixes", "iduser", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        }
      })
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("currentsixes", "idpoke"),
      queryInterface.removeColumn("currentsixes", "iduser")
    ];
  }
};
