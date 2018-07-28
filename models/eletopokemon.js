'use strict';
module.exports = (sequelize, DataTypes) => {
  var eletopokemon = sequelize.define('eletopokemon', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return eletopokemon;
};