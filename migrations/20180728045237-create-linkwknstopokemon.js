"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("wknstopokemons", "pwfid", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pokemons",
          key: "id"
        }
      }),
      queryInterface.addColumn("wknstopokemons", "wknsid", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "elements",
          id: "id"
        }
      })
    ];
  },
  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("wknstopokemons", "pwfid"),
      queryInterface.removeColumn("wknstopokemons", "wknsid")
    ];
  }
};
