'use strict';
module.exports = (sequelize, DataTypes) => {
  var currentsix = sequelize.define('currentsix', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return currentsix;
};