'use strict';
module.exports = (sequelize, DataTypes) => {
  var wknstopokemon = sequelize.define('wknstopokemon', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return wknstopokemon;
};