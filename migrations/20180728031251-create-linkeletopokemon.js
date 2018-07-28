"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("eletopokemons", "pokeid", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pokemons",
          key: "id"
        }
      }),
      queryInterface.addColumn("eletopokemons", "eleid", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "elements",
          key: "id"
        }
      })
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("eletopokemons", "pokeid"),
      queryInterface.removeColumn("eletopokemons", "eleid")
    ];
  }
};
