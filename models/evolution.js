'use strict';
module.exports = (sequelize, DataTypes) => {
  var evolution = sequelize.define('evolution', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return evolution;
};