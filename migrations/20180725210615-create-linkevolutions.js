"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("evolution", "evo", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pokemons",
          key: "id"
        }
      }),
      queryInterface.addColumn("evolution", "poke", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pokemons",
          key: "id"
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("evolution", "poke"),
      queryInterface.removeColumn("evolution", "evo")
    ];
  }
};
